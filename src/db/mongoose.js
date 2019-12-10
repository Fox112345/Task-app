const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})


// const user = new User({
//     name: 'Artem   ',
//     email: 'sdfjai@fnfjsdf.com   ',
//     password: '     dfgagaesrgfas'
// })

// user.save()
//     .then((r) => console.log(r))
//     .catch((e) => console.log('Error!!!', e))



const Task = mongoose.model('Tasks', {
    descr: {
        type: String,
        required: true,
        trim: true
    },
    done: {
        type: Boolean,
        default: false
    }
})

// const task = new Task({
//     descr: 'Task 1',
// })

// task.save()
//     .then((r) => console.log(r))
//     .catch((e) => console.log('Error!!!', e))