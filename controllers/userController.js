const axios = require('axios');

q = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=2";

exports.loadMainPage = (req,res,next) =>
{
    res.render('home', { title: 'Hey', message: 'Hello there!' });
}
exports.catalogo = (req,res,next) =>
{
    axios.get(q).then(resp => {
        var results = resp.data.results;
        res.render('catalogo',{apiResults:results});
    })
    
}

exports.login = (req, res, next) =>
{
    res.render('login');
}

exports.validateLogin = (req,res,next) =>
{
    res.redirect('/');
}

exports.register = (req,res,next) =>
{
    res.redirect('/');
}