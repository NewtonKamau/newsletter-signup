//jshint esversion : 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
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
  //url to mailchip to make the requests
  const url = "https://us10.api.mailchimp.com/3.0/lists/97dd09c7d9";
  //options to help with authentication
  const options = {
    method: "POST",
    auth: "Newton:{ApiKey}",
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html")
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  //send data to mailchip using write()
  request.write(jsonData);
  //end the write request
  request.end();
});
app.post("/failure", function (req,res) {
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("serving at 3000");
});

//api key
//
