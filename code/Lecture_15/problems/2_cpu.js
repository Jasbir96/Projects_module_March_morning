/***
 * usually these are some of the cpu intensive task
 * * image processing
 * * video processing
 * * compression , decompression

 * ***/

/***
 * denial of service attack -> request -> route -> a lot of time to answer the result
 * **/
// fib calculator

const express = require('express');
const app = express();
const cors = require("cors");
app.use(cors());

function calculateFibonacci(number) {
    // this code is snychonous and will execute competely in call stack
    if (number <= 1) {
        return number;
    }
    return calculateFibonacci(number - 1) + calculateFibonacci(number - 2);
}
app.get('/fib', (req, res) => {
    const { target, requestNumber } = req.query;
    console.log("received req", requestNumber);

    const answer = calculateFibonacci(target);
    res.status(200).json({
        status: "success",
        message: answer,
        requestNumber: requestNumber
    })
});

app.listen(3000, function () {
    console.log("server is running at port 3000");
})

