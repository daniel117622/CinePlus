const axios = require('axios');

const MovieShow = require('../models/MovieShows');
const User = require('../models/Users')
const Cine = require('../models/Cines');

const { getDb } = require('../database/database');
const { isEmailValid } = require('../public/js/functions');
const { getUsers } = require('../public/js/functions');


exports.adminDashboard = (req,res,next) =>
{
    /*
    ms = new MovieShow(1234)
    ms.addShow(2,new Date('2013-12-12T16:00:00.000Z'),"Sala 3",[{num_asiento:"A1",ocupado:true,id_usuario:1},{num_asiento:"A2",ocupado:false,id_usuario:1},{num_asiento:"A3",ocupado:true,id_usuario:1},]);
    ms.addShow(2,new Date('2015-12-12T16:00:00.000Z'),"Sala 2",[{num_asiento:"A1",ocupado:true,id_usuario:1}]);
    ms.addShow(2,new Date('2056-12-12T16:00:00.000Z'),"Sala 1",[{num_asiento:"A1",ocupado:false,id_usuario:1}]);
    ms.save();
    */
    res.render('admin',{title: "Dashboard", isAdmin:req.session.isAdmin, isLoggedIn:req.session.isLoggedIn});
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
    res.render('admin',{title: "Boletos", isAdmin:req.session.isAdmin, isLoggedIn:req.session.isLoggedIn, table:"boletos"});
}
exports.adminUsuarios = async(req,res,next) =>
{
    // console.log('Loaded: Usuarios page');
    const { users, error} = await getUsers();
    
    res.render('admin',{title: "Usuarios", isAdmin:req.session.isAdmin, isLoggedIn:req.session.isLoggedIn, table:"usuarios", data : users});
}
exports.saveUsuario = (req, res, next) => 
{
	console.log('Guardando usuario...');

	let _username = req.body.username;
	let _email = req.body.email;
	let _password = req.body.password;
	let _admin = req.body.admin_status;
    
	if (!isEmailValid(_email)) {
        // PASAR ERROR A VIEW
		return res.send({error: 'Email inválido'});
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
            next(new Error(error));
			res.redirect('/admin/usuarios');
		});
};

exports.deleteUsuario = async (req, res) => {
	if (!req.params) {
        res.redirect('/');
	}
	// const { users, error } = await getUsers();
	User.deleteById(req.params.id)
        .then(res => console.log(res))
        .catch(err => console.log(err));

    res.redirect('/');
};

exports.adminFunciones = (req,res,next) =>
{
    // console.log('Funciones');
    res.render('admin',{title: "Funciones", isAdmin:req.session.isAdmin, isLoggedIn:req.session.isLoggedIn, table:"funciones"});
}

exports.adminCines = (req,res,next) =>
{
    res.render('admin',{title: "Cines", isAdmin:req.session.isAdmin, isLoggedIn:req.session.isLoggedIn, table:"cines"});
}

exports.addNewCine = async(req,res,next) => // This is a POST
{
    if (!req.body) 
    {
        res.redirect('/admin/cines');
	}
    
    const _nombre = req.body.nombre
    const _direccion = req.body.ubicacion
    const _num_salas = req.body.salas
    let newCine = new Cine(_nombre, _direccion, _num_salas);
    
    await newCine.generarId();
    newCine.save();

    res.redirect('/admin/cines');
}

exports.adminSalas = (req,res,next) =>
{
    Cine.getAllCines()
        .then((arr) => {
            // console.log(arr)
            res.render('admin',{title: "Salas", isAdmin:req.session.isAdmin, isLoggedIn:req.session.isLoggedIn, table:"salas", cinesAll:arr});
        })
    
}

exports.adminSalasPost = (req,res,next) =>
{
    let cine_opc = req.body.cine_opc;

    Cine.getAllCines()
        .then((arr) => {
            res.render('admin',{title: "Salas", isAdmin:req.session.isAdmin, table:"salas", cinesAll:arr, cine_opc:cine_opc});
        })
}

