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
    constructor(nombre, direccion, num_salas)
    {
        this.nombre = nombre;
        this.direccion = direccion;
        this.num_salas = num_salas;
    }

    save() 
    {
        const db = getDb();
        db.collection('cines')
            .insertOne(this)
            .then((res) => {
                console.log('Insertion succesful');
            })
            .catch((err) => {
                console.log('Error on insertion');
            });
    }


}