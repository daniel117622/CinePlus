const getDb = require('../database/database').getDb;

module.exports = class User {
    constructor(email,username,password,admin=false)
    {
        this.email = email;
        this.password = password;
        this.username = username;
        this.admin = admin;
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
    
    static deleteById(Id)
    {
        const db = getDb();
        try {
            // console.log("Borrando...");
            db.collection('users').deleteOne({id: Id});
            
        } catch (error) {
            console.log("Error...");
            console.log(error)
        }
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