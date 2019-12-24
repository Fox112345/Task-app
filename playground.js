require('./src/db/mongoose')
const Task = require('./src/models/task')

Task.findByIdAndDelete('5def8bc02fbf8d138828e619').then(task => {
    console.log(`Task ${task} deleted`);
    return Task.countDocuments({done: true})
}).then(doneTasks => console.log(doneTasks)
)