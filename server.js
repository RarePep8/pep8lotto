const express = require('express');
var mysql = require('mysql');
const app = express();




var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});




app.use(express.static('public'));
/**
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
**/
var router = express.Router();

//router.post('/send', login.register);

var index = require('./routes/index')
app.use('/', index);

app.use('/api', router);
// listen for requests :)
// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });
app.listen(process.env.PORT);
console.log("App listening on port 8080");
