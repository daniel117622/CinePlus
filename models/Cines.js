const { getDb } = require('../database/database');
const { getMaxSala } = require('../public/js/functions');

// Cines:[
//     string: {
//         nombre: string,
//         direccion: string,
//         n_salas: number,
//      },
// ]

module.exports = class Cine {
	constructor(nombre, direccion, num_salas) {
		this._id = 0;
		this.nombre = nombre;
		this.direccion = direccion;
		this.num_salas = num_salas;
	}

	save() {
		const db = getDb();

		db.collection('cines')
			.insertOne(this)
			.then((res) => {
				console.log('Insertion succesful');
			})
			.catch((err) => {
				console.log(err);
			});
	}

	async generarId() {
		const { newId } = await getMaxSala();
		this._id = newId;
	}

    static getAllCines() {
        const db = getDb();
        return db.collection('cines').find().toArray();
    }
};
