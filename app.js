const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");



const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/Signup.html");
});

app.post("/", function(req, res){

  const fristName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body. email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        marge_fields: {
          FNAME: fristName,
          LNAME: lastName
        }
      }
    ]
  };

  const JSONData = JSON.stringify(data);

  const url = "https://us13.api.mailchip.com/3.0/lists/ba052aa207";

  const options = {
    method: "POST",
    auth:   "dani1:38062208c4630370f3edfdc3822dd0b9-us13"
  }

  const request = https.request(url, options, function(response){

    if (response.statusCode === 200){
      res.send(__dirname + "/Success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    });

  });
  request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running now");
});




// b841c77d2c  dani

//9ef0df4447afb124d7215f0f9c5aaa23-us10



//ba052aa207

// 38062208c4630370f3edfdc3822dd0b9-us13
