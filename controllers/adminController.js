const axios = require('axios');

const MovieShow = require('../models/movieShows');
const User = require('../models/users')

const { getDb } = require('../database/database');
const { isEmailValid } = require('../public/js/functions');


exports.adminDashboard = (req,res,next) =>
{
    /*
    ms = new MovieShow(1234)
    ms.addShow(2,new Date('2013-12-12T16:00:00.000Z'),"Sala 3",[{num_asiento:"A1",ocupado:true,id_usuario:1},{num_asiento:"A2",ocupado:false,id_usuario:1},{num_asiento:"A3",ocupado:true,id_usuario:1},]);
    ms.addShow(2,new Date('2015-12-12T16:00:00.000Z'),"Sala 2",[{num_asiento:"A1",ocupado:true,id_usuario:1}]);
    ms.addShow(2,new Date('2056-12-12T16:00:00.000Z'),"Sala 1",[{num_asiento:"A1",ocupado:false,id_usuario:1}]);
    ms.save();
    */
    res.render('admin',{title: "Dashboard", isAdmin : req.session.isAdmin});
}
exports.adminPushFunction = (req,res,next) =>
{
    let sel_movies = req.body.movie_id;
    let cine_ids = req.body.cine_id;
    let dates = req.body.datetime;

    let db = getDb()
    sel_movies = [sel_movies];
    sel_movies = sel_movies.map(Number)
    for (let i = 0 ; i < sel_movies.length ; i++)
    {
        const filter = {_id:sel_movies[i]};
        const update = {$push : {funciones: {cineID: cine_ids[i], time: dates[i],asientos:[]}}}
        db.collection('funcion').updateOne(filter,update)
        .then((r) => {console.log(r)})
        .catch((err) => {console.log(err)})
    }

    res.redirect('/admin/funciones')
}
exports.adminBoletos = (req,res,next) =>
{
    console.log('Boletos');
    res.render('admin',{title: "Boletos", isAdmin : req.session.isAdmin,table:"boletos"});
}
exports.adminUsuarios = (req,res,next) =>
{
    // console.log(req.body);
    console.log('Loaded: Usuarios page');

    const db = getDb();
    db.collection("users").find({}).toArray( (err,db_res) => {
        if (err) { res.render('/') }
        let users = db_res;
        
        res.render('admin',{title: "Usuarios", isAdmin : req.session.isAdmin,table:"usuarios", data : users});
    })
    
}
exports.saveUsuario = (req, res, next) => 
{
	console.log('Guardando usuario...');

	let _username = req.body.username;
	let _email = req.body.email;
	let _password = req.body.password;
	let _admin = req.body.admin_status;
	console.log(_username, _email, _password, _admin);
	if (!isEmailValid(_email)) {
        // PASAR ERROR A VIEW
		// console.log("invalid email");
		res.redirect('/admin/usuarios');
		throw new Error('Email inválido');
	}

	User.findByEmail(_email)
		.then((data) => {
			if (data != null) {
				throw 'Attempted to create an existing user';
			}
			if (_username.length <= 5) {
				throw 'Username is too short';
			}
			if (_password.length <= 5) {
				throw 'Password is too short';
			}

			// Guardar usuario
			let newUser = new User(_email, _username, _password, _admin);
			newUser.save();

			res.redirect('/admin/usuarios');
		})
		.catch((error) => {
			// PASAR ERROR A VIEW
			// PASAR ERROR A VIEW
			// PASAR ERROR A VIEW
            next(new Error(error));
			res.redirect('/admin/usuarios');
		});
};

exports.deleteUsuario = (req,res,next) => 
{
    if(!req.body){
        return;
    }
    
    var id = req.params.id;
    User.deleteById(id)
    res.redirect('/admin/usuarios');
}

exports.adminFunciones = (req,res,next) =>
{
    console.log('Funciones');
    res.render('admin',{title: "Funciones", isAdmin : req.session.isAdmin,table:"funciones"});
}

