const express = require("express");
const ProductRouter = express.Router();
const { getProduct, getAllProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/ProductController");
const { sanityMiddleWare } = require("../middleware/sanityReqObj");
const { checkForValidRolesMiddleWare, protectRouteMiddleWare } = require("../middleware/authMiddleWare");
// /  -> get
//1. create a product
ProductRouter.route("/")
    // [admin, seller] -> input
    // when request arrive -> user -> among the input or not 
    .post(sanityMiddleWare, protectRouteMiddleWare, 
        checkForValidRolesMiddleWare(["admin", "seller"]), 
        createProduct)
    //admin, manager
    .get(protectRouteMiddleWare, 
         getAllProduct);
ProductRouter.route("/:id")
    //  no authroization
    .get(getProduct)
    // admin ,seller
    .patch(protectRouteMiddleWare, 
        checkForValidRolesMiddleWare(["admin", "seller"]), 
        updateProduct)
    // admin , manager , seller
    .delete(protectRouteMiddleWare, 
    checkForValidRolesMiddleWare(["admin" ,"seller", "manager"]), 
    deleteProduct);

module.exports = ProductRouter;

