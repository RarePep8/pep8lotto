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
            var result_string = (result.length == 0) ? "" : result[0].password;
            var response = {
                "verified": (result_string != "") && (result_string == password)
            };
            var authenticated = (result_string != "") && (result_string == password);
            console.log(authenticated);
        });
    });
    return authenticated;
}
app.get('/earn', function(req, res) {

});
app.get('/login', function(req, res) {
    var username = req.param('username');
    var password = req.param('password');
    var authenticated = authenticate(username, password);
    console.log(authenticated);
    res.send(authenticated);
});

module.exports = app;
