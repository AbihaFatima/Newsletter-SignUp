const express = require("express");
const bodyParser = require("body-parser");
var request = require("request");

const app= express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;
    
    var data = {
        members:[
            {
            email_address: email,
            //first_name: firstName,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            }
        }
    ]
        
    };

    var jsonData = JSON.stringify(data);

    var option = {
        url: "https://us1.api.mailchimp.com/3.0/lists/e01529e959",
        method: "POST",
        headers: {
            "Authorization": "abiha1 6a3ebf3bd5b4a241bf9f7641c34cdef6-us1"
        },
       body: jsonData

    }

request(option, function(error,response,body){
        if (error){
           res.sendFile(__dirname + "/failure.html"); 
        }
        else{
            if(response.statusCode === 200){
                res.sendFile(__dirname + "/success.html");
            } else{
                res.sendFile(__dirname + "/failure.html"); 
            }
        }
});

});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000");
});

