const mongoose = require("mongoose");

/*********************productSchema**************************/
let productSchemaObject = {
    name: {
        type: String,
        required: true,
        minlength: [4, "product name should atleast have four characters"],
    },
    price: {
        type: Number,
        required: true,
        min: [0, "price can't be negative"]
    },
    discount: {
        type: Number,
        default: 0,
        validate: [function () {
            return this.price >= this.discount;
        }, "discount can't be more then the price"]
    },
    description: String,
    brand: String,
    category: {
        type: String,
        required: true
    }
}
const productSchema = new mongoose.Schema(productSchemaObject);

/**********************pre-hooks*****************/
const catgories  = ["electronics","furniture","clothing","educational"];
productSchema.pre("save", function (next) {
    let isPresent = catgories.find((cCategory) => { return cCategory == this.category })

    if (isPresent == undefined) {
        const error = new Error("category is invalid");
        next(error);
    }
})
// productMODEL 
const ProductModel = mongoose.model("MarchproductModel", productSchema);

module.exports = ProductModel;

