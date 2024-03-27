
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
 * 
 * **/


const signupController = async function (req, res) {
    try {
    
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message,
            status: "success"
        })
    }
}



const loginController = async function (req, res) {
    try {


    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "failure",
            message: err.message
        })
    }
}
const protectRouteMiddleWare = async function (req, res, next) {
    try {
       
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure"
        })
        
    }
}
const getUserData = async function (req, res) {
    try {
        const id = req.userId;
        const user = await UserModel.findById(id);
        res.status(200).json({
            "message": "user data retrieved  successfully",
            user: user
        })
    } catch (err) {
        res.status(200).json({
            message: err.message
        })
    }
}
/************routes***************/
app.post("/signup", signupController);
app.post("/login", loginController);
app.get("/allowIfLoggedIn", protectRouteMiddleWare, getUserData);


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