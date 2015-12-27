'use strict';

//dependencies
var express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    path = require('path');

//create express app
var app = express();

//setup the web server
app.server = http.createServer(app);

//settings
app.disable('x-powered-by');
app.set('port', config.port);

//middleware
app.use(require('serve-static')(path.join(__dirname, 'client/dist')));
app.use(require('method-override')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//listen up
app.server.listen(app.config.port, function(){
    //and... we're live
    console.log('Starting server on ', app.config.port);
});
