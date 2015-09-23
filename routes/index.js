var express = require("express");
var router = express.Router();
var morgan = require("morgan");
var path = require("path");
var tweetBank = require("../tweetBank.js");

router.use(function(req, res, next) {
  var logger = morgan("combined", {
    skip: function(req, res) {
      return res.statusCode < 400;
    }
  });

  logger(req, res, function(error){
    if(error) return done(error);
  });

  /* console.log(req.method, req.url, res.statusCode);
  console.log("Verb: ",req.method);
  console.log("Path: ",req.url);
  console.log("Status Code: ",res.statusCode);*/
  next();
});

router.get('/', function(req, res, next){
  var tweets = tweetBank.list();
  res.render('index', { title: 'Twitter.js', tweets: tweets });
  //res.send("website is working  ");
  //people.printPeople();
});

router.get( "/stylesheets/style.css", function(req, res, next){
  var options = {
    root: path.join(__dirname, '../public/stylesheets'),
    dotfile: "deny",
    headers: {
      "x-timestamp" : Date.now(),
      "x-sent" : true
    }

  };

  res.sendFile('style.css', options, function(error){
    if(error){
      console.log(error);
      res.status(error.status).end();
    } else {
      console.log("Sent: style.css");
    }
  });
});

router.get('/news', function(req, res, next){
  res.send("There is no news at the moment");
});

module.exports = router;