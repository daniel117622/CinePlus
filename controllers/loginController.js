const { urlencoded } = require('body-parser');
const User = require('../models/users')
const getDb = require('../database/database').getDb;

const db = getDb();
const { isEmailValid } = require('./functions');

exports.login = (req, res, next) =>
{
    res.render('login');
}

exports.validateLogin = (req,res,next) =>
{
    // Only is validated if user is login
    var reqPassword = req.body.password;
    var reqEmail = req.body.username;

    User.findByEmail(reqEmail)
    .then((data) => {
        console.log(data)
        if (data == null)
        {
            req.session.isLoggedIn = false;
            res.redirect('/');
        }
        else
        {
            if (data.password == reqPassword)
            {
                req.session.isLoggedIn = true;
                req.session.username = data.username;
                if (data.admin) {req.session.isAdmin = true}                
                res.redirect('/');
            }
            else
            {
                req.session.isLoggedIn = false;
                res.redirect('/')
            }
        }
    })
    .catch(err => {
        console.log("Cant connect to database")
        res.redirect('/');
    })
    

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
    var _username = req.body.username;
    var _email = req.body.email;
    var _password = req.body.password;


    if (!isEmailValid(_email)) // Return if invalid email
    {
        res.redirect('/');
        return;
    }

    User.findByEmail(_email)
    .then( (data) => {
        console.log(data);
        if (!(data === null))
        {
            console.log('Attempted to create an existing user')
            res.redirect('/login');
            return;
        }
        if (_username.length <= 5)
        {
            console.log('Too short username')
            res.redirect('/')
            return;
        }
    
        if (_password.length <= 5)
        {
            console.log('Too short username')
            res.redirect('/')
            return;
        }
        
        let usr = new User(_email,_username,_password);
        usr.save()
        req.session.isLoggedIn = true;
    
        res.redirect('/');
    })
    .catch( (err) => {console.log(err)});
    

}

