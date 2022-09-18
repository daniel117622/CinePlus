const path = require('path');
const session = require('express-session')
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const userRoutes = require('./routes/user');

app.use(session({secret:'power',resave: false, saveUninitialized: false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', userRoutes);

app.listen(3000);
