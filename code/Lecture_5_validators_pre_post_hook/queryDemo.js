const express = require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const { DB_USER, DB_PASSWORD } = process.env;
/*****************************/

// reading the content
/*****connect to the DB******/
const dbUrl =
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.drcvhxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(dbUrl)
    .then(function (conn) {
        console.log("connected to db")
    }).catch(err => console.log(err))
const ProductModel = require("./mvc/models/ProductModel");
/***
 * 1. req.body
 * 2. req.params
 * 3. req.query
 * ***/
// localhost: 3001 /query?sort=discount_desc&page=1
app.get("/query", (req, res) => {
    console.log(req.query);
    res.status(200).json({
        message: "receievd request"
    })
})


app.get("/product", async (req, res) => {
    try {
        // sorting
        // parsing -> is my logic
        let [parameter, value] = req.query.sort.split("_");
        value = value == "desc" ? -1 : 1;
        // pagination and filtering 
        const query = ProductModel.find().sort({ [parameter]: value });
        const products = await query;
        // if user is present -> send the resp
        if (products.length != 0) {
            res.status(200).json({
                message: products,
            })
            // if it's not there then send user not found 
        } else {
            res.status(404).json({
                message: "did not get any user"
            })
        }
    } catch (err) {
        res.status(500).json({
            status: "Internal server error",
            message: err.message
        })
    }

})
app.listen(3001, () => {
    console.log("server started at port 3001");
});