/***
 * npm init -y
 * npm install express
 * ***/

const express = require("express");
const fs = require("fs");
const { nextTick } = require("process");
const short = require('short-uuid');
// server is created
const app = express();
// reading the content
const strContent = fs.readFileSync("./dev-data.json", "utf-8");
const userDataStore = JSON.parse(strContent);

/****
 * 1. sanity check -> data is there or not before actually doing the operations
 * 
 * post -> /api/user -> body.json
 * 
 * 
 * 2. authentciation  -> to protect the data
 * 3. Authroization -> 
 * **/

/*****
 * 0. request is accepted in the serial manner from top to bottom
  * 
 * 1. **if** a route is matched -> it's handler will execute 
 *           -> app.use -> it's handler will excute for every execute for every rquest
 *           -> app.get,post,patch,delete -> it's handler will execute on resp. request
 * 2. there is always a third optional parameter to all handler functions have -> next 
 *      next -> forwards the request to the upcoming route and handler
 *      res -> terminates the the cycle    
 * 
 * ***/
const getUser = (req, res, next) => {
    console.log("recived the get request");
    // you have to foward the request
    next();
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
app.get("/api/user", function secondGET(req, res, next) {
    console.log("I was the second get");
    next()
})
app.use("/api/user", function firstUse(req, res, next) {
    console.log("I am app.use after second get");
    next();
})
app.use(function lastUse(req, res,next) {
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





//            res      next         next        next
//    server[lastUse<--firtUse<--seondGET<--getUser]   <---     client

//                                                 ----> client



// -> route , matches , does not 
        // it it matches -> it's handler function will excute



        //   res     next              res      next
//    server[lastUse<--firtUse<--seondGET<--getUser]   <---     client

//                                                 ----> client





/***
 * Update Course ->  * sanity check->  Authenication->   Authorization  -> update feature  
 *                             /              /                                   
 * ***/ 