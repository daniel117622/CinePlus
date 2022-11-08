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
    constructor(nombre, id_cine, asientos = 30)
    {
        this.nombre = nombre;
        this.id_cine = id_cine;
        this.asientos = asientos;
    }

    save() 
    {
        const db = getDb();
        db.collection('salas')
            .insertOne(this)
            .then((res) => {})
            .catch((err) => {
                console.log('Error on insertion');
            });
    }


}