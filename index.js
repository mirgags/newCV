var fs = require('fs');
var handlebars = require('handlebars');
var $ = require('jquery');
var express = require('express');
var favicon = require('serve-favicon');
var app = express();

const http = require('http');
const https = require('https');
/*
var privateKey = fs.readFileSync('sslcert/server.key', 'utf-8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf-8');
var credentials = {key: privateKey, cert: certificate};
*/
const hostname = 'localhost';
const httpPort = process.env.PORT || 8080;
const httpsPort = process.env.PORT || 6339;

app.get('/', function(req, res) {
  var theHtml = fs.readFileSync('./templates/layout.html');
  res.writeHeader(200, {"Content-Type": "text/html"});
  res.write(theHtml.toString());
  res.end();
});

app.get('/home', function(req, res) {
  var theHtml = fs.readFileSync('./templates/home.html');
  res.writeHeader(200, {"Content-Type": "text/html"});
  res.write(theHtml.toString());
  res.end();
});

app.get('/about', function(req, res) {
  var theHtml = fs.readFileSync('./templates/about.html');
  res.writeHeader(200, {"Content-Type": "text/html"});
  res.write(theHtml.toString());
  res.end();
});

app.get('/stuff', function(req, res) {
  var theHtml = fs.readFileSync('./templates/stuff.html');
  res.writeHeader(200, {"Content-Type": "text/html"});
  res.write(theHtml.toString());
  res.end();
});

app.get('/resume', function(req, res) {
  var theHtml = fs.readFileSync('./templates/resume.html');
  res.writeHeader(200, {"Content-Type": "text/html",
                        "Accept-Ranges": "bytes"});
  res.write(theHtml.toString());
  res.end();
});
/*
app.get('/favicon.ico', function(req, res) {
  var theFavicon = fs.readFileSync('./public/images/favicon.png');
  res.writeHeader(200, {"Content-Type": "image/png"});
  res.end(theFavicon);
});
*/
var allowCrossDomain = function(req, res, next) {
    if ('OPTIONS' == req.method) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
      res.send(200);
    }
    else {
      next();
    }
};

//app.use(express.compress());
app.use(allowCrossDomain);
app.use(express.static('public'));
app.use(favicon(__dirname + '/public/favicon.ico'));

var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);

httpServer.listen(process.env.PORT || 8080);
//httpsServer.listen(process.env.PORT || 6339);
//app.listen(port);
console.log('Server running');
