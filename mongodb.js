// CRUD create read update delete
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://localhost:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {
    useNewUrlParser: true
}, (err, client) => {
    if (err) {
        return console.log("Unable to connect to DB");
    }

    const db = client.db(databaseName);
    db.collection('users').insertOne({
        name: 'Me',
        age: 12
    }, (err , result) => {
        if (err) console.log(err);
        console.log(result.opt);
    })

    
    

})