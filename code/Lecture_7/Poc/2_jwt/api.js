const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());





/****send the token ***/
app.get("/sign", async function (req, res) {
    try {
      

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
