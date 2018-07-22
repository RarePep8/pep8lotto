var mysql = require('mysql');
var pool= mysql.createPool(process.env.DATABASE_URL);
// pool.getConnection(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

module.exports.pool = pool;
