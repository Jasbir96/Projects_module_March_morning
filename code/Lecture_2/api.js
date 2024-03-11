/***
 * npm init -y
 * npm install express
 * ***/

const express = require("express");
// server is created
const app = express();
const getUser = (req, res) => {
    console.log("recived the get request");
    res.status(200).json({
        message: "got the get request"
    })
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
app.get("/api/user", getUser);
//1. create a user
app.post("/api/user", createUser);
// 3. update the user
app.patch("/api/user", updateUser);
// 4 delete the user
app.delete("/api/user", deleteUser);
// 5. resource not found 

/****
 * * every time any request is send the cb function inside the app.use will be invoked
 * * inside the cb function you get two object -> 
 *          first -> req -> reprsents the HTTP request 
 *          second -> res -> reprsents the HTTP res 
 * **/

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

