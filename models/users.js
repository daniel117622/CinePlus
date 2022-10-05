const getDb = require('../database/database').getDb;

module.exports = class User {
    constructor(email,username,password)
    {
        this.email = email;
        this.password = password;
        this.username = username;
        this.admin = false;
    }
    save()
    {
        const db = getDb();
        db.collection('users').insertOne(this)
        .then(res => {
            
        })
        .catch(err => {
            console.log("Error on insertion")
        });
    }

    static fetchAll()
    {
        const db = getDb();
        return db.collection('users').find().toArray()
    }

    static findByEmail(mail)
    {
        const db = getDb();
        return db.collection('users').findOne({email:mail});
    }
}