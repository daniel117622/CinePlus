const getDb = require('../database/database').getDb;

module.exports = class MovieShow
{
    constructor(movieID)
    {
        this._id = movieID;
        this.funciones = []
    }
    // special time format. seatArrangment is a 64bit int.
    addShow(theaterID,time,sala,seatArrangment)
    {
        let newShow = {cineID : theaterID,time: time,n_sala:sala,asientos: seatArrangment};
        this.funciones.push(newShow);
    }
    display()
    {
        console.log(JSON.stringify(this));
    }
    save() // Pending to check if already exists.
    {
        const db = getDb();
        db.collection('funcion').insertOne(this)
        .then(res => {
            
        })
        .catch(err => {
            if (err.code == 11000)  {// Duplicate key error.
                console.log('Already exists in database')
            }
        });
    }

}