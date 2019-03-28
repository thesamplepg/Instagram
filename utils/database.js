const { MongoClient } = require('mongodb');

let client;

module.exports.connectDB = (callback) => {

    MongoClient.connect(require('../keys').mongodb, {useNewUrlParser: true}, (err, db) => {

        if(err) return console.log(err);

        client = db;

        callback();
    
    });
}

const getDatabase = (dataBaseName) => {
    return client.db(dataBaseName);
}

module.exports.getDatabase = getDatabase;