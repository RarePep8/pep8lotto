const express = require('express');
var mysql = require('mysql');
const app = express();




var con = mysql.createConnection({
  host: "us-cdbr-iron-east-04.cleardb.net",
  user: "beffe759b1f87c",
  password: "2616966b",
  database: "heroku_49fd57648176c9b",
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

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
