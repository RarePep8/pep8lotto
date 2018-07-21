var express = require('express')
var app = express()
var database = require('../database');
app.use(express.static('/../public'));
app.get('/', function(req, res) {
  res.sendFile('index.html', {root: './views/'});
});
app.get('/login', function(req, res) {
  database.connection.getConnection(function(err) {
    if (err) throw err;
    database.connection.query("SELECT * FROM user", function (err, result, fields) {
      if(err) throw err;
      var username = req.param('user');
      console.log(username);
      console.log(result);
      res.send(result);
    });
  });
});

module.exports = app;
