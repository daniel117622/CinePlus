const getDb = require('../database/database').getDb;

// Cines:[
//     string: {
//         nombre: string, 
//         direccion: string,
//         n_salas: number,
//      },
// ]

module.exports = class Cine
{
    constructor(nombre, direccion, n_salas)
    {
        this.nombre = nombre;
        this.direccion = direccion;
        this.salas = n_salas;
    }

    save() 
    {
        const db = getDb();
        db.collection('cines')
            .insertOne(this)
            .then((res) => {})
            .catch((err) => {
                console.log('Error on insertion');
            });
    }


}