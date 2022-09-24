const getDb = require('../database/database').getDb;

module.exports = class User {
    constructor(email,username,password)
    {
        this.email = email;
        this.password = password;
        this.username = this.username;
    }
    save()
    {
        const db = getDb();
        db.collection('users').insertOne(this)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log("Error on insertion")
        });
    }
}