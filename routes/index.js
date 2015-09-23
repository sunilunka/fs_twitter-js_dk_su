var express = require("express");
var router = express.Router();
var morgan = require("morgan");
var path = require("path");
var tweetBank = require("../tweetBank.js");
var bodyParser = require("body-parser");


module.exports = function (io){
  var urlEncodedParser = bodyParser.urlencoded({extended: false});

  router.use(function(req, res, next) {
    var logger = morgan("combined", {
      skip: function(req, res) {
        return res.statusCode < 400;
      }
    });

    logger(req, res, function(error){
      if(error) return done(error);
    });

    next();
  });

  router.get('/', function(req, res, next){
    var tweets = tweetBank.list();
    res.render('index', { title: 'Twitter.js', tweets: tweets , showForm: true});
  });


  router.get('/users/:name', function(req, res, next){
    var name = req.params.name;
    var list = tweetBank.find( {name: name});

    res.render('index', { title: 'Twitter.js - Posts by ' + name, tweets: list , showForm: true, user: name});
  });


  router.post('/submit', urlEncodedParser, function(req, res) {
    console.log(req.body);
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    io.sockets.emit('new_tweet', {name: name, text: text});
    res.redirect('/');
  });


  router.get('/news', function(req, res, next){
    res.send("There is no news at the moment");
  });



    return router;
};




/* console.log(req.method, req.url, res.statusCode);
  console.log("Verb: ",req.method);
  console.log("Path: ",req.url);
  console.log("Status Code: ",res.statusCode);*/

//pass req.path
/*++++++++++++++++++++++++++++++
function getPublicAssets(requestPath) {
  //check if path exists
  var fileName = requestPath.split("/");
  fileName = fileName[fileName.length-1];

  console.log(requestPath, fileName);
  router.get(requestPath, function(req, res, next) {
    var options = {
    root: path.join(__dirname, '../public/stylesheets'),
    dotfile: "deny",
    headers: {
      "x-timestamp" : Date.now(),
      "x-sent" : true
    }
    }

    res.sendFile(fileName, options, function(error){
      if(error){
       console.log(error);
       res.status(error.status).end();
      } else {
       console.log("Sent: ", fileName);
      }
    });
  });
}
++++++++++++++++++++++++++++*/

