const { urlencoded } = require('body-parser');
const User = require('../models/users')

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
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    console.log(username)
    
    let usr = new User(email,username,password);
    usr.save()
    console.log({usr})

    res.redirect('/');
}