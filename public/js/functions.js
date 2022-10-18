const axios = require('axios');
const { getDb } = require('../../database/database');

const loadMovies = () => {
	return axios
		.get(q)
		.then((resp) => {
			return resp.data.results;
		})
		.catch((err) => {
			console.log(err);
		});
};

const getUsers = async () => {
	const db = getDb();
	const users = await db.collection('users').find().toArray();

	if (users.length < 0) {
		return {
			users: users,
			error: 'No hay usuarios',
		};
	}
		
	return {
		users: users,
		error: null
	}
};

const isEmailValid = (email) => {
	var emailRegex =
		/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

	if (!email) return false;

	if (email.length > 254) return false;

	var valid = emailRegex.test(email);
	if (!valid) return false;

	// Further checking of some things regex can't handle
	var parts = email.split('@');
	if (parts[0].length > 64) return false;

	var domainParts = parts[1].split('.');
	if (
		domainParts.some(function (part) {
			return part.length > 63;
		})
	)
		return false;

	return true;
};

exports.loadMovies = loadMovies;
exports.getUsers = getUsers;
exports.isEmailValid = isEmailValid;
