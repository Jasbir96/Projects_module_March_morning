const express = require("express");
const app = express();
// thrid party 
const cookieParser = require("cookie-parser");

/****
 * 1. body -> req.body (express.json())
 * 2. params ->req.params
 * 3. query -> req.query
 * 4. cookies -> req.cookies (cookie-parser)
 * **/
/***
 * 1. send the res + cookies
 * 2. checking if it has cookie -> custom logic 
 * 3. clear the cookie
 * **/
// i will set a cookie here 
app.use(cookieParser());
app.get("/", function (req, res) {
    // send the cookie to the user
    res.cookie("prevpage", "home", {
        // cookie will be aftetr how much time
        maxAge: 1000 * 60 * 60 * 24,
        // your cookie can't be tampered by cleint side scripts
        httpOnly: true,
        secure: true
    })
    res.status(200).json({
        message: "thank you for the visit"
    })
})

// i will check whether the user visiting for the first or it has already visited
app.get("/product", function (req, res) {
    // getting alll the cookies wrt to your hostname
    let messageStr = ""
    if (req.cookies && req.cookies.prevpage) {
        messageStr = `You have already visited ${req.cookies.prevpage}`;
    }
    res.status(200).json({
        message: `thank you for accessing product route ${messageStr}`
    })
})
// clear your cookies -> on a server
app.get("/clearCookies", function (req, res) {
    // clearing the cookie -> name of the cookie , path where it was created 
    res.clearCookie('prevpage', { path: "/" });
    res.status(200).json({
        message: "i have cleared your cookie"
    })

})

app.listen(3000, function () {
    console.log(` server is listening to port 3000`);
})