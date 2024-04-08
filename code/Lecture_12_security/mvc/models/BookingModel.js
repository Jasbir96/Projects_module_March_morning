const mongoose = require("mongoose");

/*********************bookingSchema**************************/
let bookingSchemaObject = {
    bookedAt: {
        type: Date,
        default: Date.now()
    },
    price_at_that_time: {
        type: Number,
        required: true
    },
    payment_order_id: {
        type: String,
        required: true
    }
    , user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "MarchUserModel"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "MarchproductModel"
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "success", "failure"]
    }

}
const bookingSchema = new mongoose.Schema(bookingSchemaObject);
/**********************pre-hooks*****************/


const BookingModel = mongoose.model("MarchbookingModel", bookingSchema);

module.exports = BookingModel;

