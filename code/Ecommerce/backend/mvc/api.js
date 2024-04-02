/***
 * npm init -y
 * npm install express
 * ***/
const express = require("express");
const mongoose = require("mongoose");
/**********env variables **********/
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path")
dotenv.config({ path: path.join(__dirname, "../",".env") });
const { DB_USER, DB_PASSWORD, } = process.env;
console.log(DB_USER, DB_PASSWORD);
/*****************************/
const app = express();

// reading the content
/*****connect to the DB******/
const dbUrl =
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.drcvhxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(dbUrl)
    .then(function (conn) {
        console.log("connected to db")
    }).catch(err => console.log(err))
/************************************/
const corsConfig = {
    origin: true,
    credentials: true,
};
// this is allowing all the requests
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));
/**********payload -> req.body**************/
app.use(express.json());
/*******to get the cookie in req.cookies**/
app.use(cookieParser());


const ProductRouter = require("./router/ProductRouter");
const UserRouter = require("./router/UserRouter");
const AuthRouter = require("./router/AuthRouter");
// request -> user -> api/v1/user
app.use("/api/v1/user", UserRouter);
// request -> product -> api/v1/product
app.use("/api/v1/product", ProductRouter);

app.use("/api/v1/auth", AuthRouter);



/***********************user*********************/

// 5. resource not found 

app.use(function (req, res) {
    console.log("recieved the request");
    res.status(404).json({
        message: "resource not found"
    })
})

// listening for all the http request 
app.listen(3000, function () {
    console.log("Listening to port 3000");
})

/****
 * REST API
 * MVC archtitetcture
 * factory design pattern
 * **/

