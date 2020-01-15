const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error ('Email invalid!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.includes('password')){
                throw new Error ('Email contain "password"!')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value<0) {
                throw new Error ('Its should be positive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'Tasks',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.genAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'ksdjfnJBNKJjn;lJ;NOIO')

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if(!user) throw new Error ('Incorrect User')

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) throw new Error ('Incorrect Password')

    
    

    return user
}

//Hash pass before saving
userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Удаляем таски перед удалением пользователя
userSchema.pre('remove', async function(next) {
    const user = this;
    await Task.deleteMany({owner: user._id})
    next()
})

const User = mongoose.model('Users', userSchema)

module.exports = User