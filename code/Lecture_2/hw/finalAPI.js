/***
 * npm init -y
 * npm install express
 * ***/

const express = require("express");
const fs = require("fs");
const short = require('short-uuid');
// server is created
const app = express();
// reading the content
const strContent = fs.readFileSync("./dev-data.json", "utf-8");
const userDataStore = JSON.parse(strContent);





const updateUser = (req, res) => {
  
}
const deleteUser = (req, res) => {
   
}
app.use(express.json());

// 3. update the user
app.patch("/api/user/:id", updateUser);
// 4 delete the user
app.delete("/api/user/:id", deleteUser);


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



