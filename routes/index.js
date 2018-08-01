var express = require('express')
var app = express()
var database = require('../database');
app.use(express.static('/../public'));
app.get('/', function(req, res) {
    res.sendFile('index.html', {
        root: './views/'
    });
});

function authenticate(username, password) {
    database.pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query("SELECT password FROM user WHERE username=" + username, function(err, result, fields) {
            if (err) throw err;
            connection.release();
            console.log(result);
            result_string = (result.length == 0) ? "" : result[0].password;
            console.log(result_string);
            console.log(password);
            console.log((result_string != "") && (result_string == password));
            var response = {
                "verified": (result_string != "") && (result_string == password)
            };
            var authenticated = (result_string != "") && (result_string == password);
            return authenticated;
        });
    });
}
app.get('/earn', function(req, res) {

});
app.get('/login', function(req, res) {
    var username = req.param('username');
    var password = req.param('password');
    var authenticated = authenticate(username, password);
    res.send(authenticated);
});

module.exports = app;
