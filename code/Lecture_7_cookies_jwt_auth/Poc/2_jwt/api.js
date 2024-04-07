const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const util = require("util");
const promisify = util.promisify;
const promisdiedJWTsign = promisify(jwt.sign);
const promisdiedJWTverify = promisify(jwt.verify);
const app = express();
app.use(cookieParser());

const SECRET = "k,djnvdn";
const payload = "1234";

/****send the token ***/
app.get("/sign", async function (req, res) {
    try {
        // create the token
        const authToken = await promisdiedJWTsign({ payload }, SECRET, { algorithm: "HS256" });
        // add it to cookies
        // transport -> cookies
        res.cookie("jwt", authToken, { maxAge: 90000000, httpOnly: true });
        //  send actual reponse
        res.status(200).json({
            message: "signed the jwt and sending it in the cookie",
            authToken
        })
    } catch (err) {
        console.log("err", err);
        res.status(400).json({
            message: err.message,
            status: "failure"
        })
    }
})
/*************verifying those tokens********************/
app.get("/verify", async function (req, res) {
    try {
        let jwt = req.cookies.jwt;
        if (jwt) {
const decryptedToken = await 
promisdiedJWTverify(jwt, SECRET);
            res.status(200).json({
                message: "jwt token is verified",
                decryptedToken
            })
        } else {
            res.status(400).json({
                message: "no jwt token found",
                status: "failure"
            })
        }
    } catch (err) {
        console.log("err", err);
        res.status(400).json({
            message: err.message,
            status: "failure"
        })
    }

})


// server -> run on a port 
app.listen(3000, function () {
    console.log(` server is listening to port 3000`);
})
