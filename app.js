const path = require('path');
const session = require('express-session')
const express = require('express');
const bodyParser = require('body-parser');

const mongoConnect = require('./database/database');


const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const unsignedRoutes = require('./routes/home');
const loginRoutes = require('./routes/login');
const movieRoutes = require('./routes/movie')
const adminRoutes = require('./routes/admin')

app.use(session({secret:'power',resave: false, saveUninitialized: false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/',express.static(path.join(__dirname, 'public')));
app.use('/pelicula',express.static(path.join(__dirname, 'public')));
app.use('/admin',express.static(path.join(__dirname, 'public')));

app.use('/', unsignedRoutes);
app.use('/', loginRoutes);
app.use('/pelicula',movieRoutes);
app.use('/admin',adminRoutes)

mongoConnect.mongoConnect( (client) => {
    app.listen(3000);
});


