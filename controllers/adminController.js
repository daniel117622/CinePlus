const User = require('../models/users')
const getDb = require('../database/database').getDb;
const axios = require('axios');
const MovieShow = require('../models/movieShows');


exports.adminDashboard = (req,res,next) =>
{
    ms = new MovieShow(1234)
    ms.addShow(2,new Date('2013-12-12T16:00:00.000Z'),"Sala 3",[{num_asiento:"A1",ocupado:true,id_usuario:1},{num_asiento:"A2",ocupado:false,id_usuario:1},{num_asiento:"A3",ocupado:true,id_usuario:1},]);
    ms.addShow(2,new Date('2015-12-12T16:00:00.000Z'),"Sala 2",[{num_asiento:"A1",ocupado:true,id_usuario:1}]);
    ms.addShow(2,new Date('2056-12-12T16:00:00.000Z'),"Sala 1",[{num_asiento:"A1",ocupado:false,id_usuario:1}]);
    ms.save();
    res.render('admin',{isAdmin : req.session.isAdmin});
}
exports.adminBoletos = (req,res,next) =>
{
    console.log('Boletos');
    res.render('admin',{isAdmin : req.session.isAdmin,table:"boletos"});
}
exports.adminUsuarios = (req,res,next) =>
{
    console.log('Usuarios')
    const db = getDb();
    db.collection("users").find({}).toArray( (err,db_res) => {
        if (err) { res.render('/') }
        let users = db_res;
        console.log(users)
        res.render('admin',{isAdmin : req.session.isAdmin,table:"usuarios", data : users});
    })
    
}
exports.adminFunciones = (req,res,next) =>
{
    console.log('Funciones');
    res.render('admin',{isAdmin : req.session.isAdmin,table:"funciones"});
}