/***
 * npm init -y
 * npm install express
 * ***/

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const { DB_USER, DB_PASSWORD } = process.env;

const app = express();
// reading the content

/*****connect to the DB******/
const dbUrl =
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.drcvhxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(dbUrl).then(function (conn) {
    console.log("connection : ", conn)
}).catch(err => console.log(err))
// connect with Database


/*************userSchema****************/
let userSchemaObject = {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true,
        minLength: 8
    },
    confirmPassword: {
        type: String,
        require: true,
        minLength: 8,
        validate: function () {
            return this.password == this.confirmPassword;
        }
    }
}
const userSchema = new mongoose.Schema(userSchemaObject);
// USERMODEL
const UserModel = mongoose.model("MarchUserModel", userSchema);
/***************handlers**********************/
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
const createUser = async (req, res) => {
    try {
        // id 
        const userDetails = req.body;
        const user = await UserModel.create(userDetails);
        console.log(req.body);
        res.status(201).json({
            message: "user created",
            user: user
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

        if (idx == -1) {
            res.status(404).json({
                message: "did not get the user"
            })
        } else {

            res.status(200).json({
                status: "sucess",
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
//1. create a user
app.post("/api/user",
    sanityMiddleWare,
    createUser);// profile page -> user
// 2. get the user
app.get("/api/user/:id", getUser);
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



