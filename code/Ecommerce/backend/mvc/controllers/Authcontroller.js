const UserModel = require("../models/UserModel");
//  dependencies -> of auth
const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;
const promisifiedJWTSign = promisify(jwt.sign);
const { JWT_SECRET } = process.env;

const loginController = async function (req, res) {
    try {

        /***
         * 1. enable login -> tell the client that user is logged In
         *      a. email and password 
         **/
        let { email, password } = req.body;
        let user = await UserModel.findOne({ email });
        if (user) {
            let areEqual = password == user.password;
            console.log(areEqual);
            if (areEqual) {
                // user is authenticated
                /* 2. Sending the token -> people remember them
                       * */
                // payload : id of that user 
                let token = await promisifiedJWTSign({ id: user["_id"] }, JWT_SECRET);
                console.log("sendning token");
                res.cookie("JWT", token, { maxAge: 90000000, httpOnly: true, path: "/" });
                res.status(200).json({
                    status: "success",
                    message: "user logged In"
                })
            } else {

                res.status(404).json({
                    status: "failure",
                    message: "email or password is incorrect"
                })
            }


        } else {
            res.status(404).json({
                status: "failure",
                message:
                    "user not found with creds"
            })
        }


    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "failure",
            message: err.message
        })
    }
}
const forgetPasswordController = async function (req, res) {
    try {
        /***
         * get an email
         * token is send to the given email
         * **/

    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure"
        })
    }



}
const signupController = async function (req, res) {
    try {
        // add it to the db 
        const userObject = req.body
        //   data -> req.body
        let newUser = await UserModel.create(userObject);
        // send a response 
        res.status(201).json({
            "message": "user created successfully",
            user: newUser,
            status: "success"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message,
            status: "success"
        })
    }
}

const resetPasswordController = async function (req, res) {
    //  -> otp 
    //  newPassword and newConfirmPassword 
    // -> params -> id 
    /****
     * 1. enter the otp
     * 2. Password and confirm password
     * 3. password is updated 
     * **/
    try {

    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure"
        })
    }


}



module.exports = {
    loginController,
    forgetPasswordController,
    resetPasswordController,
    signupController

}