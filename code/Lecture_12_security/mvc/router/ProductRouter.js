const express = require("express");
const ProductRouter = express.Router();
const { getProduct, getAllProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/ProductController");
const { sanityMiddleWare } = require("../middleware/sanityReqObj");
const rateLimit = require("express-rate-limit");

const { checkForValidRolesMiddleWare, protectRouteMiddleWare } = require("../middleware/authMiddleWare");


// /  -> get
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each user  to 100 requests per `window` (here, per 15 minutes).
    keyGenerator: function (req, res) {
        return req.userId;
    }
});
//1. create a product
ProductRouter.route("/")
    // [admin, seller] -> input
    // when request arrive -> user -> among the input or not 
    .post(sanityMiddleWare, protectRouteMiddleWare,
        checkForValidRolesMiddleWare(["admin", "seller"]),
        createProduct)
    //admin, manager
    .get(protectRouteMiddleWare,limiter,getAllProduct);
ProductRouter.route("/:id")
    //  no authroization
    .get(getProduct)
    // admin ,seller
    .patch(protectRouteMiddleWare,
        checkForValidRolesMiddleWare(["admin", "seller"]),
        updateProduct)
    // admin , manager , seller
    .delete(protectRouteMiddleWare,
        checkForValidRolesMiddleWare(["admin", "seller", "manager"]),
        deleteProduct);

module.exports = ProductRouter;

