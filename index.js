var express = require('express');
var app = express();
//mysql package import statement/initate for performing database operations like connecting and querying
var mysql      = require('mysql');
var bodyParser = require('body-parser');
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept,'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS', 'Content-Type': 'application/json'");
res.append('Access-Control-Allow-Methods', 'DELETE')
next();
});
//database connection string starts
var connection = mysql.createConnection({
  host     : 'sql12.freemysqlhosting.net',
  user     : 'sql12243541',
  password : 'GVG2drwz62',
  database : 'sql12243541'
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected with mysql database...')
})

//database connection string closed

//start body-parser configuration
app.use( bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended:true
}));
//end body-parser configuration

//get call
app.get('/myservice',function(req,res){
  connection.query('SELECT * from myserver', function (error, results) {
  if (error) throw error;
  res.send(results);
});
});

//put call
app.put('/myservice',function(req,res){
 var srinivas  = req.body;
   console.log(srinivas);
   connection.query('update myserver SET Course_name = srinivas.Course_name where srinivas.id', function (error, results) {
	  if (error) throw error;
	  res.send(results);
	});
});


//post call
app.post('/myservice', function (req, res) {
   var srinivas  = req.body;
   console.log(srinivas);
   connection.query('INSERT INTO myserver SET ?', srinivas, function (error, results) {
	  if (error) throw error;
	  res.send(results);
	});
});


//delete call
app.delete('myservice',function(req,res){
var srinivas  = req.body;
   console.log(srinivas);
   connection.query('delete from myserver where srinivas.id', function (error, results) {
	  if (error) throw error;
	  res.send(results);
	});
});


app.listen(4500);