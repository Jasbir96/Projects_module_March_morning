/****
 * Migration : 
 * * Create Update Delete huge set of entries from your DB
 * * Migration completely independent of your server
 * * You usually do migration -> seed the data, updation in case of schema change , pefromance improvement,
 * , security issue
 * 
 * ***Steps for a given Migration script**
 * a.) connect to the DB
 * b.) you need to identify the collection/model where you want to make changes
 * c.) get the list of entries and identify the query will be used and apply it  
 *      * updateMany
 *      * deleteMany
 *      * insertMany
 * d.) close the connection
 * ***/
const ProductModel = require("../../models/ProductModel");
const productList = require("../../seed_data/products");

function seedProductData(Model, entries) {
    const mongoose = require("mongoose");
    const path = require("path");
    /**********env variables **********/
    const dotenv = require("dotenv");
    dotenv.config({ path: path.join(__dirname, "../", "../", "../", ".env") });

    const { DB_USER, DB_PASSWORD } = process.env;

    /*****connect to the DB******/
    const dbUrl =
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.drcvhxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    mongoose.connect(dbUrl)
        .then(function (conn) {
            console.log("connected to db");
            console.log("drop existing model");
            return Model.collection.drop();
        }).then(() => {
            console.log("model dropped");
            console.log("inserting new data");
            return Model.insertMany(entries);
        })
        .then(() => {
            console.log("data seeded successfully");
        })
        .catch(err => console.log(err))
        .finally(() => {
            mongoose.disconnect();
            console.log("connection closed");
        })
}

seedProductData(ProductModel, productList);
