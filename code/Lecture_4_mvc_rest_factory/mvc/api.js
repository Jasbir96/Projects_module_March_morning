/***
 * npm init -y
 * npm install express
 * ***/
const express = require("express");
const mongoose = require("mongoose");
/**********env variables **********/
const dotenv = require("dotenv");
dotenv.config();
const { DB_USER, DB_PASSWORD } = process.env;
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
const { getUser, getAllUser, createUser, updateUser, deleteUser } = require("./controllers/UserContoller");
const { getProduct, getAllProduct, createProduct } = require("./controllers/ProductController");
const {sanityMiddleWare}=require("./middleware/sanityReqObj");
/**********payload -> req.body**************/
app.use(express.json());

app.post("/api/v1/user", sanityMiddleWare, createUser);// profile page -> user
app.get("/api/v1/user", getAllUser);
// 2. get the user
app.get("/api/v1/user/:id", getUser);
// 3. update the user
app.patch("/api/v1/user/:id", updateUser);
// 4 delete the user
app.delete("/api/v1/user/:id", deleteUser);
/***********************user*********************/
//1. create a product
app.post("/api/v1/product", sanityMiddleWare, createProduct);// profile page -> user
app.get("/api/v1/product", getAllProduct);
// 2. get the user
app.get("/api/v1/product/:id", getProduct);
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




