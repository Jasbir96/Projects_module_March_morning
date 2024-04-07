
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

const emailSender =require("./2_dynamicMailSender")
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
        // get the user details
        const userDetails = req.body;
        // create the user
        const user = await UserModel.create(userDetails);
        // send the reponse
        
        res.status(201).json({
            message: "user created",
            newUser: user
        })
        await emailSender(
            "welcome.html",
            user.email,
            { name: user.name }
        )
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
        /***
         * 1. email and password -> in payload or not -> yes / no -> return res -> 400
         * 2. search with email -> yes / no return -> password/email is not correct
         * 3. password -> compare -> password /not correct -> password/email is not correct
         * 4. create the token and send it -> payload 
         * 5. send the response user is logged in
         * ***/
        // 1. email and password -> in payload or not -> yes / no -> return res -> 400
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: "failure",
                message: "email and password is required"
            })
        }
        // 2. search with email -> yes / no return -> password/email is not correct
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                status: "failure",
                message: "email/password is not correct"
            })
        }

        if (user.password !== password) {
            return res.status(400).json({
                status: "failure",
                message: "email/password is not correct"
            })
        }
        // 4. create the token and send it -> payload
        const authToken = await promisifiedJWTSign({ id: user["_id"] }, JWT_SECRET);
        // add it to cookies
        // transport -> cookies
        res.cookie("jwt", authToken, { maxAge: 90000000, httpOnly: true });
        //  send actual reponse
        res.status(200).json({
            message: "user loggedIn",
            status: "success",
            authToken
        })


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
        /***
         * 1. check for jwt token -> if yes move to next step -> if no -> return 400
         * 2. verify the token -> if yes move to next step -> if no -> return 400
         * 3. you can add that property to req object an call next
         * 
         * **/
        let jwt = req.cookies.jwt;
        if (!jwt) {
            return res.status(400).json({
                message: "you need to be loggedIn go to /login",
                status: "failure"
            })
        }
        const decryptedToken = await promisifiedJWTVerify(jwt, JWT_SECRET);
        const userId = decryptedToken.id;
        req.userId = userId;
        next();
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
app.get("/allowIfLoggedIn",protectRouteMiddleWare,getUserData);

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