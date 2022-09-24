const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => 
{
    MongoClient.connect("mongodb+srv://daniel117622:ids@danieldelacruz.iavhn.mongodb.net/CinePlus?retryWrites=true")
    .then(client => {
        console.log('Connected');
        _db = client.db();
        cb();
    })
    .catch((err) => {
        console.log(err);
    })
}

const getDb = () =>
{
    if (_db)
    {
        return _db;
    }
    
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb
