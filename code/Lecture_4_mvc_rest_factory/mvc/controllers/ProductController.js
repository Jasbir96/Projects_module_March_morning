const ProductModel = require("../models/ProductModel");
const { createFactory } = require("../utils/resourceFactory");
const getProduct = async (req, res) => {
    try {
        // template -> get the data from req.params
        const id = req.params.id;

        const product = await ProductModel.findById(id);
        // if user is present -> send the resp
        if (product) {
            res.status(200).json({
                message: product
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
const getAllProduct = async (req, res) => {
    try {

        const product = await ProductModel.find();
        // if user is present -> send the resp
        if (product.length != 0) {
            res.status(200).json({
                message: product,
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

}
const createProduct = createFactory(ProductModel);
module.exports = { getProduct, getAllProduct, createProduct };