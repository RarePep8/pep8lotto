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
    database.connection.query("UPDATE user SET balance = balance + 1 WHERE user_id = 2;");
    var username = req.param('username');
    var password = req.param('password');
    database.connection.query("SELECT password FROM user WHERE username=" + username, function (err, result, fields) {
      if(err) throw err;
      console.log(result);
      result_string = (result.length == 0) ? "" : result[0].password;
      console.log(result_string);
      console.log(password);
      console.log((result_string != "") && (result_string == password));
      var response = {"verified" : (result_string != "") && (result_string == password)};
      res.send((result_string != "") && (result_string == password));
    });
  });
});

module.exports = app;
