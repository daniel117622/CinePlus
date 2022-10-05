const User = require('../models/users')
const getDb = require('../database/database').getDb;

const db = getDb();

exports.adminDashboard = (req,res,next) =>
{
    res.render('admin',{isAdmin : req.session.isAdmin});
}
exports.adminBoletos = (req,res,next) =>
{
    console.log('Boletos');
    res.render('admin',{isAdmin : req.session.isAdmin});
}
exports.adminUsuarios = (req,res,next) =>
{
    console.log('Usuarios');
    res.render('admin',{isAdmin : req.session.isAdmin});
}
exports.adminFunciones = (req,res,next) =>
{
    console.log('Funciones');
    res.render('admin',{isAdmin : req.session.isAdmin});
}