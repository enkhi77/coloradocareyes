'use strict';

//dependencies
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');
var path = require('path');

//create express app
var app = express();

//middleware
app.use('/',express.static(path.join(__dirname, '..', 'client/dist'),{ redirect: false }));
//app.use('/css', express.static(path.join(__dirname, 'client/dist/css')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

//console.log('Check directory', express.static);

//routes
app.get('/', function(req, res, next){
    res.sendFile('index.html', {root: 'client/dist'});
});

//listen up
app.listen(3000);
console.log('App listening on port 3000');