var express = require('express')
var app = express()
var database = require('../database');
app.use(express.static('/../public'));
app.get('/', function(req, res) {
	res.sendFile('index.html');
});
var fs = require('fs');
var items= JSON.parse(fs.readFileSync('routes/blocks.json', 'utf8'));
var rarityColors = JSON.parse(fs.readFileSync('routes/rarity-colours.json', 'utf8'));

const double_query = "UPDATE user SET balance = balance *2 where username=";
const halve_query = "UPDATE user SET balance = balance /2 where username=";
const increase_quantity_query1 =
	"INSERT INTO user_item_pair (user_id,item_id,item_rarity,item_quantity) VALUES (";
const increase_quantity_query2 =
	",1)ON DUPLICATE KEY UPDATE item_quantity = item_quantity + 1";

function authenticate(req, res, action) {
	var username = req.query.username;
	var password = req.query.password;
	var authenticated = false;
	database.pool.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query("SELECT * FROM user WHERE username=" + username,
			function(err, result, fields) {
				if(err) throw err;
				connection.release();
				var result_string = (result.length == 0) ? "" : result[0].password;
				var response = {
					authenticated: false,
					balance: null,
					itemName: null,
					itemUrl: null,
					raw: null
				}
				response.authenticated = (result_string != "") && (result_string ==
					password);
				if(response.authenticated) {
					var userId = result[0].user_id;
				}
				if(action == "login") {
					res.send(response.authenticated);
				} else if(action == "get-balance") {
					if(response.authenticated) {
						response.balance = result[0].balance;
					}
					res.send(response);
				} else if(action == "earn" && response.authenticated) {
					queryEarn(userId, res);
				} else if(action == "open-basic" && response.authenticated) {
					queryOpenBasic(userId, res);
				} else if(action== "open-dotted" && response.authenticated){
					queryOpenDotted(userId, res);
				}else if(action == "inventory" && response.authenticated) {
					queryInventory(userId, res);
				}
			});
	});
}

function queryEarn(userId, res) {
	var chosen_query = halve_query;
	if(Math.random() > 0.5) {
		chosen_query = double_query;
	}
	database.pool.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query(chosen_query + username, function(err,
			result, fields) {
			if(err) throw err;
			connection.release();
			var response = {
				"authenticated": true
			}
			res.send(response.authenticated);
		});
	});
}

function queryOpenBasic(userId, res) {
	var rarityInt = Math.random();
	if(rarityInt < 0.75) {
		var itemInt = Math.floor(Math.random() * 6) + 1;
		rarityInt = 3;
	} else {
		var itemInt = Math.floor(Math.random() * 6) + 8;
		rarityInt = 4;
	}
	var response = {
		"itemName": items[itemInt].name,
		"itemUrl": items[itemInt].url
	}
	database.pool.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query(increase_quantity_query1 + userId + "," +
			itemInt + "," + rarityInt + increase_quantity_query2,
			function(err, result, fields) {
				if(err) throw err;
				connection.release();
				res.send(response);
			});
	});
}
function queryOpenDotted(userId, res) {
	var rarityInt = Math.random();
	if(rarityInt < 0.75) {
		var itemInt = Math.floor(Math.random() * 6) + 15;
		rarityInt = 3;
	} else {
		var itemInt = Math.floor(Math.random() * 6) + 22;
		rarityInt = 4;
	}
	var response = {
		"itemName": items[itemInt].name,
		"itemUrl": items[itemInt].url
	}
	database.pool.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query(increase_quantity_query1 + userId + "," +
			itemInt + "," + rarityInt + increase_quantity_query2,
			function(err, result, fields) {
				if(err) throw err;
				connection.release();
				res.send(response);
			});
	});
}
function queryInventory(userId, res) {
	database.pool.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query(
			"SELECT item_id, item_rarity, item_quantity FROM user_item_pair WHERE user_id=" +
			userId,
			function(err, result, fields) {
				if(err) throw err;
				connection.release();
				var response = {
					inventory: result
				};
				//        var responseJSON = JSON.stringify(response);
				for(var index in response.inventory) {
					var item = response.inventory[index];
					item.itemName = items[item.item_id].name;
					item.itemUrl = items[item.item_id].url;
          item.itemColor = rarityColors[items[item.item_id].rarity];
				}
				res.send(response);
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
app.get('/open-basic', function(req, res) {
	authenticate(req, res, 'open-basic');
});
app.get('/open-dotted', function(req, res) {
	authenticate(req, res, 'open-dotted');
});
app.get('/inventory', function(req, res) {
	authenticate(req, res, 'inventory');
});
module.exports = app;
