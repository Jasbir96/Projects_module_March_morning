const mongoose=require("mongoose");
/*********************userSchema**************************/
let userSchemaObject = {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true,
        minLength: 8
    },
    confirmPassword: {
        type: String,
        require: true,
        minLength: 8,
        validate: function () {
            return this.password == this.confirmPassword;
        }
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        default: "user"
    }
}
const userSchema = new mongoose.Schema(userSchemaObject);

/**********************pre-hooks*****************/
userSchema.pre("save", function () {
    this.confirmPassword = undefined;
})
const roles = ["admin", "buyer", "seller"];
userSchema.pre("save", function (next) {
    let isPresent = roles.find((cRole) => { return cRole == this.role })
    if (isPresent == undefined) {
        const error = new Error("role is invalid");
        next(error);
    }
})

// USERMODEL 
const UserModel = mongoose.model("MarchUserModel", userSchema);

module.exports = UserModel;

