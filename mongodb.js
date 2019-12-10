// CRUD create read update delete
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://localhost:27017';
const databaseName = 'task-manager';


MongoClient.connect(connectionURL, {
    useNewUrlParser: true
}, (err, client) => {
    if (err) {
        return console.log("Unable to connect to DB");
    }

    const db = client.db(databaseName);
    
    // db.collection('users').updateOne({
    //     _id: new ObjectID('5de7ba8125bf07107cf567dd')
    // }, {
    //     $inc: {
    //         age: 2
    //     }
    // }).then((result) => {
    //     console.log(result);
        
    // }).catch((err) => {
    //     console.log(err);
        
    // })

    db.collection('tasks').deleteOne({
        title: "Find 1"
    })

})