const axios = require('axios');
const cheerio = require('cheerio');

const User = require('../models/users')

q = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=2";

exports.loadMainPage = (req,res,next) =>
{
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



