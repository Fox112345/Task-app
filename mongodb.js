// CRUD create read update delete
const mongodb = require('mongodb')
const MongoClient  = mongodb.MongoClient

const connectionURL = 'mongodb://localhost:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log("Unable to connect to DB");
    }

    console.log("Connected correctly");
    
})