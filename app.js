const path = require('path');
const session = require('express-session')
const express = require('express');
const bodyParser = require('body-parser');

const mongoConnect = require('./database/database');


const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const unsignedRoutes = require('./routes/unsignedUsers');
const loginRoutes = require('./routes/login');

app.use(session({secret:'power',resave: false, saveUninitialized: false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', unsignedRoutes);
app.use('/', loginRoutes);

mongoConnect.mongoConnect( (client) => {
    app.listen(3000);
});


