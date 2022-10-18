// const getDb = require('../database/database').getDb;

// Salas:{
//     nombre: string, 
//     id_cine: number,
//     asientos: {
//         string: [number],
//     },
// }

module.exports = class Sala
{
    constructor(nombre, id_cine)
    {
        this.nombre = nombre;
        this.id_cine = id_cine;
        this.asientos = {
            A:  [1,2,3,4,5,6],
            B:  [1,2,3,4,5,6],
            C:  [1,2,3,4,5,6],
            D:  [1,2,3,4,5,6],
        };
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