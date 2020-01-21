const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})


// const user = new User({
//     name: 'Artem   ',
//     email: 'sdfjai@fnfjsdf.com   ',
//     password: '     dfgagaesrgfas'
// })

// user.save()
//     .then((r) => console.log(r))
//     .catch((e) => console.log('Error!!!', e))



// const task = new Task({
//     descr: 'Task 1',
// })

// task.save()
//     .then((r) => console.log(r))
//     .catch((e) => console.log('Error!!!', e))