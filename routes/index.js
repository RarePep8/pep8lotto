var express = require('express')
var app = express()
var database = require('../database');
app.use(express.static('/../public'));
app.get('/', function(req, res) {
  res.sendFile('index.html', {root: './views/'});
});

module.exports = app;
