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
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const email = req.body.email;
  //data object to be passed to mailchip
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  //convert that data to json string
  var jsonData = JSON.stringify(data);
});

app.listen(3000, function () {
  console.log("serving at 3000");
});


