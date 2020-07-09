//jshint esversion : 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { response } = require("express");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
  var firstName = req.body.firstname;
  var lastName = req.body.lastname;
  var email = req.body.email;
  console.log(firstName + lastName + email);
});

app.listen(3000, function () {
  console.log("serving at 3000");
});
