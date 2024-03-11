/***
 * npm init -y
 * npm install express
 * ***/

const express = require("express");
const fs = require("fs");
// server is created
const app = express();
// reading the content
const strContent = fs.readFileSync("./dev-data.json", "utf-8");
const userDataStore = JSON.parse(strContent);




const getUser = (req, res) => {
    try {
        // template -> get the data from req.params
        const id = req.params.id;
        // finding the user
        const user = userDataStore.find((userObject) => {
            return userObject.id == id;
        })
        // if user is present -> send the resp
        if (user) {
            res.status(200).json({
                message: user
            })
            // if it's not there then send user not found 
        } else {
            res.status(404).json({
                message: "did not get the user"
            })
        }
    }catch(err){
        res.status(500).json({
            message:"Internal server error"
        })
    }
   
}

const createUser = (req, res) => {
    console.log("Received post request");
    console.log("body", req.body);
    res.json({
        message: "Recieved the post request"
    })
}

const updateUser = (req, res) => {
    console.log("Received patch request");
    console.log("body", req.body);
    res.json({
        message: "Recieved the patch request"
    })
}
const deleteUser = (req, res) => {
    console.log("Received delete request");
    console.log("body", req.body);
    res.json({
        message: "Recieved the delete request"
    })
}
app.use(express.json());
// profile page -> user
// 2. get the user
app.get("/api/user/:id", getUser);
// 3. update the user
app.patch("/api/user/:id", updateUser);
// 4 delete the user
app.delete("/api/user/:id", deleteUser);
//1. create a user
app.post("/api/user", createUser);

// 5. resource not found 

app.use(function (req, res) {
    console.log("recieved the request");
    res.status(404).json({
        message: "resource not found"
    })
})

console.log("hello");
// listening for all the http request 
app.listen(3000, function () {
    console.log("Listening to port 3000");
})




/****
 * {
        "id": 1,
        "name": "Steve Harvey",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
            }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
        }
    },
 * 
 * 
 * **/ 