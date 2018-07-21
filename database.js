var mysql = require('mysql');
var connection= mysql.createPool(process.env.DATABASE_URL);
connection.getConnection(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
module.exports.connection = connection;
