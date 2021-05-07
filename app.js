var express = require("express");
var app = express();

app.set('view engine', 'ejs');


app.use(express.static('public'));


app.get("/", function(req, res, next){
    res.render("index", {});
});

var server = app.listen(3001, function(){
  console.log("Node.js is listening to URL: ( http://localhost:" + server.address().port + ' )');
});


