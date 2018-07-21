var express = require('express')
var app = express()
var database = require('../database');
app.use(express.static('/../public'));
app.get('/', function(req, res) {
  res.sendFile('index.html', {root: './views/'});
});
connection.getConnection(function(err) {
  if (err) throw err;
  connection.query("SELECT * FROM user", function (err, result, fields) {
    if(err) throw err;
    console.log(result);
  });
});
module.exports = app;
