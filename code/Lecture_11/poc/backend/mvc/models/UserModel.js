const mongoose = require("mongoose");
/*********************userSchema**************************/
let userSchemaObject = {
    name: {
        type: String,
        required: [true, "name is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        require: true,
        minLength: [8, "password should be atleast 8 characters long"],
    },
    confirmPassword: {
        type: String,
        require: true,
        minLength: 8,
        validate: [function () {
            return this.password == this.confirmPassword;
        }, "password and confirm password should be same"]
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        default: "user"
    },
    otp: {
        type: String
    },
    otpExpiry: {
        type: Date
    },
    bookings: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "MarchbookingModel"
    }
}
const userSchema = new mongoose.Schema(userSchemaObject);
/**********************pre-hooks*****************/
userSchema.pre("save", function (next) {
    this.confirmPassword = undefined;
    next();
})
const roles =
    ["admin", "seller", "user", "manager"];
userSchema.pre("save", function (next) {
    let isPresent = roles.find((cRole) => { return cRole == this.role })

    if (isPresent == undefined) {
        const error = new Error("role is invalid");
        return next(error);
    }
    return next();
})
/***
 * find-> ->getall the proprties , but (remove password, confirmpassword, __v)-> result 
 * ***/
userSchema.pre("findOne", function (next) {
    this.select("-confirmPassword -__v")
    next();
})

userSchema.post("save", function (error, doc, next) {
    /***
     * 1.  error -> error parameter
     * 2. doc -> document which is saved
     * 3. next -> next middleware
     * **/
    if (error.code == 11000) {
        next(new Error("email is already registered"));
    }
    next();
})

// USERMODEL 
const UserModel = mongoose.model("MarchUserModel", userSchema);

module.exports = UserModel;


