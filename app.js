var express = require("express");
var app = express();
var swig = require("swig");
var router = express.Router();
var people = require("./people.js")

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + "/views")

//optional
app.set('view cache', false);

swig.setDefaults({ cache: false });

router.use(function(req, res, next) {
  console.log(req.method, req.url, res.statusCode);/*
  console.log("Verb: ",req.method);
  console.log("Path: ",req.url);
  console.log("Status Code: ",res.statusCode);*/
  next();
});

router.get('/', function(req, res, next){
  res.render('index', people.data);
  //res.send("website is working  ");
  //people.printPeople();
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