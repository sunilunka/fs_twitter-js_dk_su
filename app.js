var express = require("express");
var app = express();
var swig = require("swig");
var people = require("./people.js");
var routes = require("./routes");

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + "/views");

//optional
app.set('view cache', false);

swig.setDefaults({ cache: false });


var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log("App is listening at http://%s:%s", host, port);

});

app.use('/', routes);