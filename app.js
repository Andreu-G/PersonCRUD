require('dotenv').config();
var express = require('express');
var path = require('path');
var app = express();
app.listen(3000);
var personRouter = require('./router/personRouter');
var database = require('./database/database');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, '/node_modules/@fortawesome/fontawesome-free')));
app.use('/', personRouter);
database.connectDB();