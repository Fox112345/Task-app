const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: "mike@mail.com",
    password: "1234567890",
    tokens: [{
        token: jwt.sign({
            _id: userOneId
        }, process.env.AUTH_TOKEN_KEY)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Nik',
    email: "nik@mail.com",
    password: "1234567890",
    tokens: [{
        token: jwt.sign({
            _id: userTwoId
        }, process.env.AUTH_TOKEN_KEY)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    descr: "First task",
    done: false,
    owner: userOne._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    descr: "Second task",
    done: true,
    owner: userTwo._id
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    descr: "Third task",
    done: true,
    owner: userOne._id
}

const setupDB = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()

}

module.exports = {
    userOneId,
    userOne,
    userTwo,
    setupDB,
    taskOne,
    taskTwo,
    taskThree
}