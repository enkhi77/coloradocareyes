'use strict';

//dependencies
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');

//create express app
var app = express();

//middleware
app.use(express.static(__dirname + 'client/dist'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

//routes
app.get('*', function(req, res){
    res.sendfile('../client/dist/index.html');
});

//listen up
app.listen(3000);
console.log('App listening on port 3000');