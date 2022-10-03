const axios = require('axios');
const User = require('../models/users')

q = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=2";
imgPath = "https://image.tmdb.org/t/p/w1280";

exports.loadMainPage = async(req,res,next) =>
{
    var peliculas = await loadMovies();
    console.log(peliculas)
    // console.log({peliculas})
    res.render('home', { 
        title: 'CinePlus', 
        message: 'Hello there!', 
        isLoggedIn: req.session.isLoggedIn,
        loadedMovies: peliculas,
        imgPath
    });
}
exports.catalogo = (req,res,next) =>
{
    axios.get(q).then(resp => {
        var results = resp.data.results;
        res.render('catalogo',{apiResults:results, isLoggedIn: req.session.isLoggedIn, currentUser : req.session.username});
    }).catch( err => {
        console.log("Error code: " + err.code);
        res.redirect('/');
    })
    
}

const loadMovies = async() => {
    var peliculas;
    peliculas = await axios.get(q).then(resp => {
        return resp.data.results;
    }).catch( err => {
        console.log(err);
    })
    // console.log({peliculas});
    return peliculas;
}



