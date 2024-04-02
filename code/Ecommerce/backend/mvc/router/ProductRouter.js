const express = require("express");
const ProductRouter = express.Router();
const { getProduct, getAllProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/ProductController");
const { sanityMiddleWare } = require("../middleware/sanityReqObj");
// /  -> get
//1. create a product
ProductRouter.route("/")
    // admin, seller
    .post(sanityMiddleWare, createProduct)
    //admin, manager
    .get(getAllProduct);

ProductRouter.route("/:id")
    //  no authroization
    .get(getProduct)
    // admin ,seller
    .patch(updateProduct)
    // admin , manager , seller
    .delete(deleteProduct);

module.exports = ProductRouter;