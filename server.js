var fs = require('fs');
var handlebars = require('handlebars');
var $ = require('jquery');
var express = require('express');
var app = express();

const http = require('http');

const hostname = 'localhost';
const port = 1337;

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

app.use(allowCrossDomain);
app.use(express.static('public'));

app.listen(port);
console.log(`Server running at http://${hostname}:${port}/`);
