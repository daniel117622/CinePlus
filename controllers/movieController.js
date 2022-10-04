const { default: axios } = require("axios");

exports.loadMovie = (req, res, next) =>
{
    movieId = req.params.movieId;
    axios.get("https://api.themoviedb.org/3/movie/"+movieId+"?api_key=9a9961105fe526ed2af1c01c456aa0cb")
    .then((apiRes)=> {
        console.log(apiRes.data.title)
        res.render('movieDesc',
        {   movieTitle:apiRes.data.title,
            movieDesc:apiRes.data.overview,
            moviePoster:apiRes.data.poster_path,
            popularity:apiRes.data.popularity,
            vote_average:apiRes.data.vote_average,
            vote_count: apiRes.data.vote_count
        }
        );
    })
    .catch((err) => {console.log(err)})  
}