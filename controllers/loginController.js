const { urlencoded } = require('body-parser');
const User = require('../models/users')
const getDb = require('../database/database').getDb;

const db = getDb();

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


var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

function isEmailValid(email) {
    if (!email)
        return false;

    if(email.length>254)
        return false;

    var valid = emailRegex.test(email);
    if(!valid)
        return false;

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if(parts[0].length>64)
        return false;

    var domainParts = parts[1].split(".");
    if(domainParts.some(function(part) { return part.length>63; }))
        return false;

    return true;
}