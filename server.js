var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "devbotviral.cwpwpxalycf5.eu-west-1.rds.amazonaws.com",
  user: "botviraladmin",
  password: "BOTmania2018$$$",
  database: "botviraldev01"
});
// Create the database connection once, reuse later
con.connect(function(err) {
  if (err) throw err;
});

// Read the url arguements
app.get('/share', function(req, res) {
// Register the share has led to a CTA
    var sql = "INSERT INTO referrals (campaignid, user, referrals) VALUES (" + req.query.cpn + " ," + req.query.usr + ", 1)";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log ("1 record inserted");
    });
// Get the url from the campaign
    var sql = "SELECT url FROM campaign WHERE id = " + req.query.cpn;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      Object.keys(result).forEach(function(key) {
        var row = result[key];
        console.log(row.url);
// Redirect to the camapaign url
        res.redirect(row.url);
      });
    });
});

app.get('/view', function (req, res) {
  // Get all the shares registerd for a specific customer
  var sql ="SELECT * FROM sharecount WHERE custid = " + req.query.cid
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result)
  });
});

app.listen(port);

console.log('botViral RESTful API server started on: ' + port);
