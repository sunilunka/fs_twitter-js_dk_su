var express = require("express");
var app = express();

var router = express.Router();

router.use(function(req, res, next) {
  console.log(req.method, req.url, res.statusCode);/*
  console.log("Verb: ",req.method);
  console.log("Path: ",req.url);
  console.log("Status Code: ",res.statusCode);*/
  next();
});

router.get('/', function(req, res, next){
  res.send("Website is working");
});

router.get('/news', function(req, res, next){
  res.send("There is no news at the moment");
});


var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log("App is listening at http://%s:%s", host, port);

});

app.use('/', router);