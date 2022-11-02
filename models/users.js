const { ObjectID } = require('bson');

const getDb = require('../database/database').getDb;

module.exports = class User {
	constructor(email, username, password, admin = false) {
		this.email = email;
		this.password = password;
		this.username = username;
		this.admin = admin;
	}

	save() {
		const db = getDb();
		db.collection('users')
			.insertOne(this)
			.then((res) => {})
			.catch((err) => {
				console.log('Error on insertion');
			});
	}
	
	static fetchAll() {
		const db = getDb();
		return db.collection('users').find().toArray();
	}
	
	static findByEmail(mail) {
		const db = getDb();
		return db.collection('users').findOne({ email: mail });
	}
	
	static findById(Id) {
		const db = getDb();
		return db.collection('users').findOne({ _id: ObjectID(Id) });
	}

	static async deleteById(Id) {
		const db = getDb();
		const algo = await db.collection('users').deleteOne({ _id: ObjectID(Id) });

		return algo
		
	}
};
