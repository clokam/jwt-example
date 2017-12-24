var moment = require('moment');
var express = require('express');
var prompt = require('prompt');
var jwt = require('jsonwebtoken');
var fs = require('fs');

// create a new express server
var app = express();

//Start the Express Server
var server = app.listen(1234, function() {
    console.log("----------------------------");
    console.log(moment().format('MMMM Do YYYY, hh:mm:ss a') + " | JWT Demo Server is running!");
    console.log("----------------------------");
    console.log("What would you like to do?");
    console.log("   #1. Generate a Token(Print 1)");
    console.log("   #2. Verify a Token(Print 2)");

    prompt.message = "JWT Example";
    prompt.start();

    prompt.get(['option'], function(err, result) {
        if (err) {
            console.log("Error occurred with the prompt!");
        } else if (result.option == '1') {
            prompt.get({
                properties: {
                    key: {
                        description: "Enter Private Key Location"
                    },
                    username: {
                        description: "Enter Username(No Spaces)",
                        hidden: true
                    }
                }
            }, function(err, result) {
                console.log("----------------------------");
                console.log("Token generation has started..");
                console.log("----------------------------");
                generateToken(result.key, result.username);
            });
        } else if (result.option == '2') {
            console.log("----------------------------");
            console.log("Provide Token and Usernamer for validation");
            console.log("----------------------------");
            prompt.get({
                properties: {
                    token: {
                        description: "Provide JWT Token"
                    },
                    username: {
                        description: "Enter Username(No Spaces)",
                        hidden: true
                    }
                }
            }, function(err, result) {
                console.log("----------------------------");
                console.log("Token verification in progress..");
                console.log("----------------------------");
                verifyToken(result.token, result.username);
            });
        } else {
            console.log("Please enter a valid option(ctrl + c || cmd + c and then run node app.js)");
        }
    });
});

//Function to generate JWT Token
function generateToken(key, username) {
    // sign with RSA SHA256
    var cert = fs.readFileSync(key); // get private key

    // sign asynchronously
    jwt.sign({
        username: username
    }, cert, {
        algorithm: 'RS256',
        issuer: 'mlabs'
    }, function(err, token) {
        if (err) {
            console.log("----------------------------");
            console.log(moment().format('MMMM Do YYYY, hh:mm:ss a') + " | There was an error in generating your token!");
            console.log("----------------------------");
        } else {
            console.log("----------------------------");
            console.log(moment().format('MMMM Do YYYY, hh:mm:ss a') + " | Your Token is : " + token);
            console.log("----------------------------");
        }
    });
}

//Function to verify JWT token
function verifyToken(token, username) {
    // verify issuer
    var cert = fs.readFileSync('certs/cert.pem'); // get public key
    jwt.verify(token, cert, {
        issuer: 'mlabs'
    }, function(err, decoded) {
        if(err){
          console.log("----------------------------");
          console.log(moment().format('MMMM Do YYYY, hh:mm:ss a') + " | Invalid Public Key or Token!");
          console.log("----------------------------");
        }else{
          if(decoded.username==username){
            console.log("----------------------------");
            console.log(moment().format('MMMM Do YYYY, hh:mm:ss a') + " | Token has been validated successfully with username : "+decoded.username);
            console.log("----------------------------");
          }else{
            console.log("----------------------------");
            console.log(moment().format('MMMM Do YYYY, hh:mm:ss a') + " | Username associated with token is invalid : "+username);
            console.log("----------------------------");
          }
        }
    });
}
