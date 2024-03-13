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




/*******
 * Implement updateUser and delete user
 * ***/
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
    } catch (err) {
        res.status(500).json({
            status: "Internal server error",
            message: err.message
        })
    }

}
const createUser = (req, res) => {
    try {
        // id 
        const userDetails = req.body;
        const id = short.generate();
        userDetails.id = id;
        userDataStore.push(userDetails);
        // you have write the content to the file as well
        const struserStore = JSON.stringify(userDataStore);
        fs.writeFileSync("./dev-data.json", struserStore);

        console.log(req.body);
        res.status(201).json({
            message: "user created",
            user: req.body
        })
    } catch (err) {
        res.status(500).json({
            status: "Internal server error",
            message: err.message
        })
    }

}
const updateUser = (req, res) => {
    console.log("Received patch request");
    console.log("body", req.body);
    res.json({
        message: "Recieved the patch request"
    })
}
const deleteUser = (req, res) => {
    try {
        let { id } = req.params;
        const idx = userDataStore.findIndex((userObject) => {
            return userObject.id == id;
        })
        if (idx == -1) {
            res.status(404).json({
                message: "did not get the user"
            })
        } else {
            // -> idx , one entry
            userDataStore.splice(idx,1);
            const struserStore = JSON.stringify(userDataStore);
            fs.writeFileSync("./dev-data.json", struserStore);
            res.status(200).json({
                status :"sucess",
                message: "user is deleted"
            })
        }

    } catch (err) {
        res.status(500).json({
            status: "Internal server error",
            message: err.message
        })
    }
}
const sanityMiddleWare = (req, res, next) => {
    try {
        let body = req.body;
        let isEmpty = Object.keys(body).length == 0;
        if (isEmpty) {
            res.status(400).json({
                status: "failure",
                message: "req.body is empty"
            })
        } else {
            next()
        }
    } catch (err) {
        res.status(500).json({
            status: "failure",
            message: "Internal Server error"
        })
    }
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
app.post("/api/user",
    sanityMiddleWare,
    createUser);
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



