const axios = require('axios');
const cheerio = require('cheerio');

q = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=2";

exports.loadMainPage = (req,res,next) =>
{
    console.log(req.session.isLoggedIn)
    res.render('home', { title: 'CinePlus', message: 'Hello there!', isLoggedIn: req.session.isLoggedIn });
}
exports.catalogo = (req,res,next) =>
{
    axios.get(q).then(resp => {
        var results = resp.data.results;
        res.render('catalogo',{apiResults:results, isLoggedIn: req.session.isLoggedIn});
    }).catch( err => {
        console.log("Error code: " + err.code);
        res.redirect('/');
    })
    
}

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
    console.log(req.session);
    req.session.destroy();
    res.redirect('/');
}

exports.validateRegister = (req,res,next) =>
{
    var usr = req.body.username;
    var password = req.body.password;
    axios.post('https://cineplus-9b9ce-default-rtdb.firebaseio.com/users.json',{email:usr , password:password}).then(resp => {
        console.log(req.body)
        console.log(resp.status);
        res.redirect('/');
    }).catch( err => {
        console.log("Error code: " + err.code);
        res.redirect('/');
    })

}

