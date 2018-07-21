const express = require('express');
var mysql = require('mysql');
const app = express();




var con = mysql.createConnection({
  host: "ec2-23-23-247-222.compute-1.amazonaws.com",
  user: "xkrsvbwxcunnsx",
  password: "cc9c0ea6ed43019e80d4030844bc5b12bf5005762cd1225c78f01d1852a0fd01",
  database: "d2ka9t68prkfm8"
  port: "5432"
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
listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
console.log("App listening on port 8080");
