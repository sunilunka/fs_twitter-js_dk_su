var express = require("express");
var router = express.Router();
var tweetBank = require("../tweetBank.js");

router.use(function(req, res, next) {
  console.log(req.method, req.url, res.statusCode);/*
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

router.get('/news', function(req, res, next){
  res.send("There is no news at the moment");
});

module.exports = router;