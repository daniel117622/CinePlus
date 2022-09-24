const User = require('../models/users')

exports.login = (req, res, next) =>
{

    res.render('login');
}

exports.validateLogin = (req,res,next) =>
{
    // Only is validated if user is login

    req.session.isLoggedIn = true;
    res.redirect('/');
}

exports.register = (req,res,next) =>
{
    res.render('register', { isLoggedIn: req.session.isLoggedIn });
}

exports.logout = (req,res,next) =>
{
    req.session.destroy();
    res.redirect('/');
}

exports.validateRegister = (req,res,next) =>
{
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    
    let usr = new User(email,username,password);
    usr.save()

    res.redirect('/');
}