const mongoose = require("mongoose");
// ecommerce -> Amazon 
const userSchemaRules = {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    }
    ,
    confirmPassword: {
        type: String,
        required: true,
        minlength: 8,
        // validate property 
        validate: function () {
            return this.password == this.confirmPassword
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        default: "user"
    }
}
// schema-> structure and validation 
const userSchema = new mongoose.Schema(userSchemaRules);
const roles = ["admin", "buyer", "seller", "user"];

userSchema.pre("save", function (next) {
    let isPresent = roles.find((cRole) => { return cRole == this.role })

    if (isPresent == undefined) {
        const error = new Error("role is invalid");
        return next(error);
    }
    return next();
})
// this model -> will have queries 
const UserModel = mongoose.model("MarchUserModel", userSchema);
module.exports = UserModel;
