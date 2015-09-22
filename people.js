var swig = require("swig");

var data = {
  title: "An example",
  people: [{
    name: "Gandalf"
  }, {
    name: "Frodo"
  }, { 
    name: "Hermoine"
  }]
};

function printPeople() {
  swig.renderFile("./views/index.html", data, function(error, output){
   console.log(output);
  });
}

module.exports.data = data;
module.exports.printPeople = printPeople;