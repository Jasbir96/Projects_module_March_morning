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
const forgetPasswordController = async function (req, res) {
    try {
        /****
                * 1. You can ask for email
                * 2. check if email is present or not
                *  * if email is not present -> send a response to the user(user not found)
                * 3. if email is present -> create basic otp -> and send to the email 
                * 4. also store that otp -> in the userModel
                * 5. to avoid that collison
                *      response -> unique url with id of the user and that will form your reset password 
                * 
                * ***/
        if (req.body.email == undefined) {
            return res.status(401).json({
                status: "failure",
                message: "Please enter the email for forget Password"
            })
        }
        // find the user -> going db -> getting it for the server
        let user = await UserModel.findOne({ email: req });
        if (user == null) {
            return res.status(404).json({
                status: "failure",
                message: "user not found for this email"
            })
        }
        // got the user -> on your server
        const otp = otpGenerator();
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000;
        // those updates will be send to the db
        await user.save();
        // send the mail to there email -> otp
        res.status(200).json({
            status: "success",
            message: "otp sent to your email",
            reseturl: `http://localhost:3000/resetPassword/${user["_id"]}`,
            otp: otp
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure"
        })
    }
    //  email
}

const resetPasswordController = async function (req, res) {
    //  -> otp 
    //  newPassword and newConfirmPassword 
    // -> params -> id 

    try {
        let resetDetails = req.body;
        // required fields are there or not 
        if (!resetDetails.password == true || !resetDetails.otp == true || !resetDetails.confirmPassword == true) {
            res.status(401).json({
                status: "failure",
                message: "invalid request"
            })
        }
        // i will serach with the id -> user
        const user = await UserModel.findById(req.params.id);
        // if user is not present
        if (user == null) {
            return res.status(404).json({
                status: "failure",
                message: "user not found"
            })
        }
        // if otp is not present 
        if (user.otp == undefined) {
            return res.status(401).json({
                status: "failure",
                message: "uauthorized acces to reset Password"
            })
        }
        // if otp is expired
        if (Date.now() > user.otpExpiry) {
            return res.status(401).json({
                status: "failure",
                message: "otp expired"
            })
        }
        // if otp is incorrect
        if (user.otp != resetDetails.otp) {
            return res.status(401).json({
                status: "failure",
                message: "otp is incorrect"
            })
        }

        user.password = resetDetails.password;
        user.confirmPassword = resetDetails.confirmPassword;
        // remove the otp from the user
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();
        res.status(200).json({
            status: "success",
            message: "password reset successfully"
        })



    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure"
        })
    }


}

const otpGenerator = function () {
    return Math.floor((Math.random() * 10000) + 90000);
}

module.exports = {
    loginController,
    forgetPasswordController,
    resetPasswordController,
    signupController

}