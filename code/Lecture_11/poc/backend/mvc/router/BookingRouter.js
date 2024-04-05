const express = require("express");
const { protectRouteMiddleWare } = require("../middleware/authMiddleWare");
const UserModel = require("../models/UserModel");
const ProductModel = require("../models/ProductModel");
const BookingModel = require("../models/BookingModel");
const BookingRouter = express.Router();

BookingRouter.use(protectRouteMiddleWare);
BookingRouter.post("/checkout", initalBookingController)

BookingRouter.get("/", getAllBookingsController)
BookingRouter.post("verification", confirmPaymentController)
BookingRouter.get("/orders", ordersController);
const Razorpay = require('razorpay');

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_PUBLIC_KEY,
    key_secret: process.env.RAZORPAY_PRIVATE_KEY,
});


async function initalBookingController(req, res) {
    try {
        /***
         * loggedIN -> token-> userId -> 
         *      userModel -> email, name
         * productId -> frontend
         *      search the product -> get it's price
         * create the order via razorpay -> order_id 
         * create the actual booking 
         * return the order to frontend 
         * 
         * 
         * ***/
        //1.  loggedIN -> token -> userId ->
        const userId = req.userId;
        const productId = req.body.productId
        const { email, name } =
            await UserModel.findById(userId);
        // 2. productId -> frontend
        //     * search the product -> get it's price
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                message: "product not found"
            })
        }
        //  * 3 create the order via razorpay -> order_id 
        const price_at_that_time = product.price;
        const payment_capture = 1;
        const orderConfig = {
            amount: price_at_that_time * 100,
            currency: "INR",
            payment_capture: payment_capture
        };

        const order = await razorpayInstance.orders
            .create(orderConfig);
        // 4 create the actual booking
        const bookingDetails = {
            price_at_that_time,
            payment_order_id: order.id,
            user: userId,
            product: productId
        }
        const booking = await BookingModel.create(bookingDetails);
        res.status(200).json({
            status: "success",
            message: {
                order: order,
                email, name,
                reciept: booking["_id"]
            }
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "server error"
        })

    }
}
async function getAllBookingsController(req, res) {
    try {
        const bookings = await BookingModel
            .find().populate({ path: "user", select: "name email" })
            .populate({ path: "product" });
        res.status(200).json({
            message: "all bookings",
            bookings
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "server error"
        })
    }

}
/*****
 * id:1 -> [p1,p2,p3]
 * id:2 [p1,p4,p3]
 * id:3 [p5,p6,p7]
 * **/
async function ordersController(req, res) {
    try {
        const userId = req.userId;
        const bookings = await BookingModel
            .find({ user: userId })
            .populate({ path: "product" });
        res.status(200).json({
            message: "all bookings",
            bookings
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "server error"
        })
    }
}
function confirmPaymentController(req, res) { }
module.exports = BookingRouter;