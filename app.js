var express = require("express");
var app = express();

var server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

app.set('view engine', 'ejs');

app.get("/", function(req, res, next){
    res.render("index", {});
});

/*
var text = document.getElementById('text');

var textLists = [
  "helloworld"
];

var word = [];
word =textLists[0].split("").map(function(value){
  var span = document.createElement('span');
  span.textContent = value;
  text.appendChild(span);
  return span;
});

word[0].className ="under-line";
window.addEventListener("keydown", (e)=>{
  var keycd = e.key;
  if (word[0].innerHTML == keycd) {
    word[0].className = "red";
    word[1].className ="under-line";
    text.insertBefore(word[0], word[1]);
    word.shift();
  }
});
*/

