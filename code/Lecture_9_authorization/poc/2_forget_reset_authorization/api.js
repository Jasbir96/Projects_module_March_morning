const express = require("express");

const dotenv = require("dotenv");
const mongoose = require("mongoose");
// including env variables
dotenv.config();
const { PORT, DB_PASSWORD, DB_USER, JWT_SECRET } = process.env;

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;
const promisifiedJWTSign = promisify(jwt.sign);
const promisifiedJWTVerify = promisify(jwt.verify);


/**********************connection to our DB********************************/

const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.drcvhxp.mongodb.net/?retryWrites=true&w=majority`;
// only done once 
mongoose.connect(dbURL)
    .then(function (connection) {
        console.log("connected to db");
    }).catch(err => console.log(err))
const UserModel = require("./model/UserModel");

const sendEmailHelper = require("./dynamicMailSender");
const fs = require("fs");
// never -> sync in your server 
/*************************************************/
const app = express();
/***to get the data in req.body **/
app.use(express.json());
/*******to get the cookie in req.cookies**/
app.use(cookieParser());
/*****
 * 1. signup 
 * 2. login 
 * 3. /allowIfLoggedIn -> allows you to acess getUserData if user is authenticated 
 * **/
/**********************auth handlers**************************/

const signupController = async function (req, res) {
    try {
        // add it to the db 
        const userObject = req.body
        //   data -> req.body
        let newUser = await UserModel.create(userObject);
        // send a response 
        res.status(201).json({
            "message": "user created successfully",
            user: newUser,
            status: "success"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message,
            status: "success"
        })
    }
}

/**
 * It will open forgetPassword
 *  *
 *  * Token 
 * **/
const loginController = async function (req, res) {
    try {

        /***
         * 1. enable login -> tell the client that user is logged In
         *      a. email and password 
         **/

        let { email, password } = req.body;
        let user = await UserModel.findOne({ email });
        if (user) {
            let areEqual = password == user.password;
            if (areEqual) {
                // user is authenticated
                /* 2. Sending the token -> people remember them
                       * */
                // payload : id of that user 
                let token = await promisifiedJWTSign({ id: user["_id"] }, JWT_SECRET);
                console.log("sendning token");
                res.cookie("JWT", token, { maxAge: 90000000, httpOnly: true, path: "/" });
                res.status(200).json({
                    status: "success",
                    message: "user logged In"
                })
            } else {
                console.log("err", err)
                res.status(404).json({
                    status: "failure",
                    message: "email or password is incorrect"
                })
            }


        } else {
            res.status(404).json({
                status: "failure",
                message:
                    "user not found with creds"
            })
        }


    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "failure",
            message: err.message
        })
    }
}
const forgetPasswordController = async function (req, res) {
    try {
        /***
         * get an email
         * token is send to the given email
         * **/

    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure"
        })
    }



}


const resetPasswordController = async function (req, res) {
    //  -> otp 
    //  newPassword and newConfirmPassword 
    // -> params -> id 
    /****
     * 1. enter the otp
     * 2. Password and confirm password
     * 3. password is updated 
     * **/
    try {

    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure"
        })
    }


}


const protectRouteMiddleWare = async function (req, res, next) {
    try {
        let jwttoken = req.cookies.JWT;

        let decryptedToken = await promisifiedJWTVerify(jwttoken, JWT_SECRET);
        if (decryptedToken) {
            let userId = decryptedToken.id;
            // adding the userId to the req object
            req.userId = userId
            next();
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure"
        })

    }
}
const checkIfAdminMiddleWare = async function (req, res, next) {
    try {
        const id = req.userId;
        // find the user by id 
        const user = await UserModel.findById(id);
        if (user.role == "admin") {
            next();
        } else {
            res.status(403).json({
                message: "You are not authorized to access this route",
                status: "failure"
            })
        }
    } catch (err) {

    }
}

/***user functions***/
const getUserData = async function (req, res) {
    try {
        const id = req.userId;
        const user = await UserModel.findById(id);
        res.status(200).json({
            "message": "user data retrieved  successfully",
            user: user
        })
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure"
        })
    }
}

const getAllUser = async function (req, res) {
    try {
        const userList = await UserModel.find();
        res.status(200).json({
            "message": "user data retrieved  successfully",
            user: userList
        })
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure"
        })
    }
}

/***
 * Forget password -> Email 
 * Reset Password
 * */
/************routes***************/
app.post("/signup", signupController);
app.post("/login", loginController);
app.get("/allowIfLoggedIn", protectRouteMiddleWare, getUserData);
app.patch("/forgetpassword", forgetPasswordController);
app.patch("/resetPassword/:userId", resetPasswordController);
app.get("/allowIfAdmin", protectRouteMiddleWare, checkIfAdminMiddleWare, getAllUser);


/******************handler functions ***************/
// 404 route not found
app.use(function cb(req, res) {
    // console.log("");
    // response 
    res.status(404).json({
        status: "failure",
        message: " route not found"
    })
})
// server -> run on a port 
app.listen(PORT, function () {
    console.log(` server is listening to port ${PORT}`);
})