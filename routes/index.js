var express = require('express')
var app = express()
var database = require('../database');
app.use(express.static('/../public'));
app.get('/', function(req, res) {
    res.sendFile('index.html', {
        root: './views/'
    });
});
const double_query = "UPDATE user SET balance = balance *2 where username=";
const halve_query = "UPDATE user SET balance = balance /2 where username=";
function authenticate(req, res, action) {
    var username = req.param('username');
    var password = req.param('password');
    var authenticated = false;
    database.pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query("SELECT * FROM user WHERE username=" + username, function(err, result, fields) {
                    if (err) throw err;
                    connection.release();
                    console.log(result);
                    var result_string = (result.length == 0) ? "" : result[0].password;
                    var response = {
                        "verified": (result_string != "") && (result_string == password)
                    };
                    var response = {
                        authenticated: false,
                        balance: null
                    }
                    response.authenticated = (result_string != "") && (result_string == password);
                    console.log(response.authenticated);
                    if (action == "login") {
                        res.send(response.authenticated);
                    } else if (action == "get-balance") {
                        if (response.authenticated) {
                            response.balance = result[0].balance;
                            console.log(response);
                        }
                        res.send(response);
                    } else if (action == "earn") {
                        if (response.authenticated) {
                            var chosen_query = halve_query;
                            if(Math.random() > 0.5){
                                chosen_query = double_query;
                            }
                            database.pool.getConnection(function(err, connection) {
                                    if (err) throw err;
                                    connection.query(chosen_query + username, function(err, result, fields) {
                                        if (err) throw err;
                                        connection.release();
                                        console.log(response);
                                        res.send(response.authenticated);
                                    });
                                });
                            }
                        }
                    });
            });
    }
    app.get('/earn', function(req, res) {
        authenticate(req, res, "earn");
    });
    app.get('/login', function(req, res) {
        authenticate(req, res, "login");
    });
    app.get('/get-balance', function(req, res) {
        authenticate(req, res, 'get-balance');
    });
    module.exports = app;
