var express = require('express')
var app = express()
var database = require('../database');
app.use(express.static('/../public'));
app.get('/', function(req, res) {
  res.sendFile('index.html');
});
var items = [{
  "name": "Slime Green Block",
  "url": "img/block_1.png"
}, {
  "name": "Yellow Block",
  "url": "img/block_2.png"
}, {
  "name": "Green Block",
  "url": "img/block_3.png"
}, {
  "name": "Blue Block",
  "url": "img/block_4.png"
}, {
  "name": "Purple Block",
  "url": "img/block_5.png"
}, {
  "name": "Pink Block",
  "url": "img/block_6.png"
}, {
  "name": "Cyan Block",
  "url": "img/block_7.png"
}, {
  "name": "Slime Green Checker Block",
  "url": "img/block_8.png"
}, {
  "name": "Yellow Checker Block",
  "url": "img/block_9.png"
}, {
  "name": "Green Checker Block",
  "url": "img/block_10.png"
}, {
  "name": "Blue Checker Block",
  "url": "img/block_11.png"
}, {
  "name": "Purple Checker Block",
  "url": "img/block_12.png"
}, {
  "name": "Pink Checker Block",
  "url": "img/block_13.png"
}, {
  "name": "Cyan Checker Block",
  "url": "img/block_14.png"
}];

const double_query = "UPDATE user SET balance = balance *2 where username=";
const halve_query = "UPDATE user SET balance = balance /2 where username=";
const increase_quantity_query1 =
  "INSERT INTO user_item_pair (user_id,item_id,item_quantity) VALUES (";
const increase_quantity_query2 =
  ",1)ON DUPLICATE KEY UPDATE item_quantity = item_quantity + 1";

function authenticate(req, res, action) {
  var username = req.param('username');
  var password = req.param('password');
  var authenticated = false;
  database.pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query("SELECT * FROM user WHERE username=" + username,
            function(err, result, fields) {
              if (err) throw err;
              connection.release();
              console.log(result);
              var userId = result[0].user_id;
              var result_string = (result.length == 0) ? "" : result[0].password;
              var response = {
                "verified": (result_string != "") && (result_string ==
                  password)
              };
              var response = {
                authenticated: false,
                balance: null,
                itemName: null,
                itemUrl: null
              }
              response.authenticated = (result_string != "") && (result_string ==
                password);
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
                  if (Math.random() > 0.5) {
                    chosen_query = double_query;
                  }
                  database.pool.getConnection(function(err, connection) {
                    if (err) throw err;
                    connection.query(chosen_query + username, function(err,
                      result, fields) {
                      if (err) throw err;
                      connection.release();
                      console.log(response);
                      res.send(response.authenticated);
                    });
                  });
                }
              } else if (action == "open-basic" && response.authenticated) {
                var rarityInt = Math.random();
                if (rarityInt < 0.75) {
                  var itemInt = Math.floor(Math.random() * 7);
                } else {
                  var itemInt = Math.floor(Math.random() * 7) + 7;
                }
                response.itemName = items[itemInt].name;
                response.itemUrl = items[itemInt].url;
                console.log("You got " + response.itemName);
                database.pool.getConnection(function(err, connection) {
                  if (err) throw err;
                  connection.query(increase_quantity_query1 + userId + "," +
                    itemInt + increase_quantity_query2,
                    function(err,
                      result, fields) {
                      if (err) throw err;
                      connection.release();
                      res.send(response);
                    });
                });
              } else if (action == "inventory" && response.authenticated) {
                database.pool.getConnection(function(err, connection) {
                    if (err) throw err;
                    connection.query(
                      "SELECT * FROM user_item_pair WHERE user_id=" +
                      userId,
                      function(err, result, fields) {
                        if (err) throw err;
                        connection.release();
                        res.send(response);
                      }
                    });
                });
            }
            app.get('/earn', function(req, res) {
              authenticate(req, res, "earn");
            }); app.get('/login', function(req, res) {
              authenticate(req, res, "login");
            }); app.get('/get-balance', function(req, res) {
              authenticate(req, res, 'get-balance');
            }); app.get('/open-basic', function(req, res) {
              authenticate(req, res, 'open-basic');
            }); app.get('/inventory', function(req, res) {
              authenticate(req, res, 'inventory');
            }); module.exports = app;
