const express = require("express");
const ProductRouter = express.Router();
const { getProduct, getAllProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/ProductController");
const { sanityMiddleWare } = require("../middleware/sanityReqObj");
// /  -> get
//1. create a product
ProductRouter.route("/")
    .post(sanityMiddleWare, createProduct)
    .get(getAllProduct);

ProductRouter.route("/:id")
    .get(getProduct)
    .patch(updateProduct)
    .delete(deleteProduct);

module.exports = ProductRouter;