const axios = require('axios');
const User = require('../models/users')

const { loadMovies } = require('../public/js/functions');

q = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=2";
imgPath = "https://image.tmdb.org/t/p/w1280";

exports.loadMainPage = async(req,res,next) =>
{
    var peliculas = await loadMovies();

    var first_movie_bg_main = peliculas[0];
    console.log(req.session.isLoggedIn)

    // console.log({peliculas})
    res.render('home', {
        title: 'CinePlus', 
        message: 'Hello there!', 
        isLoggedIn: req.session.isLoggedIn,
        isAdmin: req.session.isAdmin,
        loadedMovies: peliculas,
        first_movie_bg_main,
        imgPath
    });
}
exports.catalogo = (req,res,next) =>
{
    axios.get(q).then(resp => {
        var results = resp.data.results;
        res.render('catalogo',{apiResults:results, isLoggedIn: req.session.isLoggedIn, currentUser : req.session.username,isAdmin:req.session.isAdmin});
    }).catch( err => {
        console.log("Error code: " + err.code);
        res.redirect('/');
    })
    
}





