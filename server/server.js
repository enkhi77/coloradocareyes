'use strict';

//dependencies
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');
var path = require('path');

//create express app
var app = express();

app.set('port', (process.env.PORT || 5000));

//middleware
app.use('/',express.static(path.join(__dirname, '..', 'client'),{ redirect: false }));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

//console.log('Check directory', express.static);

//routes
app.get('/*', function(req, res, next){
    res.sendFile('index.html', {root: 'client'});
});

//listen up
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});