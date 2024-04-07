const express = require("express");
const { protectRouteMiddleWare } = require("../middleware/authMiddleWare");
const BookingModel = require("../models/BookingModel");
const ReviewModel = require("../models/ReviewModel");
const ProductModel = require("../models/ProductModel");
const ReviewRouter = express.Router();
const createReviewController = async function (req, res) {
    /***
     * 1. get the data=rating, review_title, review_desc,productId;
     * 2. get the user from req.user;
     * // if booking -> status -> success
     * // 3. a. create the review
     * //   b. add that review to the product
     * // 4. calculate the average rating of the product
     * // 5 update average rating of the product
     * 
     * 
     * 
     * **/
    try {
        //  * 1. get the data = rating, review_title, review_desc, productId;

        let { rating,
            review_title,
            review_desc,
            productId } = req.body;

        // if anything is missing go back
        if (!rating || !review_title || !review_desc || !productId) {
            return res.status(400).json({
                message: "rating, review_title, review_desc, productId are required",
                status: "failure"
            })
        }
        //     2. get the user from req.user;
        //  * // if booking -> status -> success
        let userId = req.userId;
        // serach the user in the booking
        const booking = await BookingModel.find({ user: userId });
        if (booking.status !== "success") {
            return res.status(400).json({
                message: "buy the product to add review",
                status: "failure"
            })
        }

        // 3. a. create the review
        let reviewObject = {
            rating,
            review_title,
            review_desc,
            product: productId,
            user: userId,
            booking: booking["_id"]
        }
        // review is created 
        const review = await ReviewModel.create(reviewObject);
        
        const product = await ProductModel.findById(productId)
            .populate({ path: "reviews", select: "rating" });
        //   b. add that review to the product

        //  * // 4. calculate the average rating of the product
        const allreviewsOfAProduct = product.reviews;

        const noOfReviews = allreviewsOfAProduct.length;
        let sum = 0;
        allreviewsOfAProduct.forEach(review => {
            sum += review.rating;
        })
        const newSum = sum + rating;
        let averageRating = newSum / (noOfReviews + 1);

        // update the review and average review in  the poduct
        product.reviews.push(review["_id"]);
        product.averageRating = averageRating;
        await product.save();

        res.status(200).json({
            message: review,
            status: "success"

        })





    } catch (err) {
        res.status(500).json({
            message: "server error",
            status: "failure"
        })
    }

}


ReviewRouter.post("/", protectRouteMiddleWare, createReviewController)
module.exports = ReviewRouter;