const express = require("express");
const { protectRouteMiddleWare } = require("../middleware/authMiddleWare");
const UserModel = require("../models/UserModel");
const ProductModel = require("../models/ProductModel");
const BookingModel = require("../models/BookingModel");
const BookingRouter = express.Router();
const crypto = require('crypto');

BookingRouter.use(protectRouteMiddleWare);
BookingRouter.post("/checkout", initalBookingController)

BookingRouter.get("/", getAllBookingsController)
BookingRouter.post("/verification", confirmPaymentController)
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
        const user = await UserModel.findById(userId);
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
        user.bookings.push(booking["_id"]);
        await user.save();

        res.status(200).json({
            status: "success",
            message: {
                order: order,
                email: user.email, name: user.name,
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
        const bookings = await UserModel.findById(userId).populate({ path: "bookings" });
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
async function confirmPaymentController(req, res) {
    try {
        // verify -> the request from -> api
        const inComingSignature = req.headers['x-razorpay-signature'];
        // create the hash
        const shasum = crypto.createHmac("sha256", process.env.WEBHOOK_SECRET);
        shasum.update(JSON.stringify(req.body));
        const freshSignature = shasum.digest('hex');
        if (freshSignature === inComingSignature) {
            // 2. get the order_id from the request
            const body = req.body;
            const order_id = body.payload.payment.enitity.order_id;
            const event = body.event;
            const booking = await BookingModel.find({ payment_order_id: order_id });
            if (event === "payment.captured") {
                // go to the booking -> update the status -> success or a failure
                booking.status = "success";
                await booking.save();
            } else {
                booking.status = "failure";
                await booking.save();
            }
            console.log(req.body);
            res.status(200).json({ message: "OK" });
        }


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "server error"
        })
    }
}
module.exports = BookingRouter;