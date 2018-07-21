var mysql = require('mysql');
var con = mysql.createPool(process.env.DATABASE_URL);
con.getConnection(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
module.exports.connection = connection;
