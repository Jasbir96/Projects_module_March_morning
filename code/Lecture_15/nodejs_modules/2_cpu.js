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
const { fork } = require("child_process");
const cors = require("cors");
app.use(cors());


app.get('/fib', (req, res) => {
    const { target, requestNumber } = req.query;
    console.log("received req", requestNumber);
    // new nodejs process for fib helper is created
    const fibWorker = fork("./fib_helper.js");
    // send the data if you want
    fibWorker.send({ target });
    // get the response
    fibWorker.on("message", function (answer) {
        res.status(200).json({
            status: "success",
            message: answer,
            requestNumber: requestNumber
        })

        // the process will be destroyed 
        fibWorker.kill();
    })
    // if there is some error
    fibWorker.on('error', (err) => {
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    });

});

app.listen(3000, function () {
    console.log("server is running at port 3000");
})

