const express = require('express');
const dotenv = require('dotenv');
const Razorpay = require('razorpay');
const ShortUniqueId = require('short-unique-id');
const cors = require('cors');
const uid = new ShortUniqueId({ length: 10 });
const crypto = require('crypto');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
// create the instance -> this instance will do everything wrt to orders
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_PUBLIC_KEY,
    key_secret: process.env.RAZORPAY_PRIVATE_KEY,
});

app.get("/", (req, res) => {
    res.send("Hello Payment");
})
// we will need to start with order creation 
app.post("/checkout", async (req, res) => {
    try {
        // get the required data for checkout
        const amount = 500;
        // currency 
        const currency = "INR";
        // reciept
        const receipt = `rp_${uid.rnd()}`;
        const payment_capture = 1;
        const orderConfig = {
            amount: amount * 100,
            currency: currency,
            receipt: receipt,
            payment_capture: payment_capture
        };

        // create the order 
        const order = await
            razorpayInstance.orders
                .create(orderConfig);
        console.log(order);
        // return the order
        res.status(200)
            .json({
                status: "success",
                order: order
            });

    } catch (err) {
        console.log(err);
        res.status(500)
            .send("Something went wrong");

    }
});

// verify the payment is done or not -> 
app.post("/verify", async (req, res) => {
    try {
        // get the signature from header
        const inComingSignature = 
        req.headers['x-razorpay-signature'];
        // create the hash
        const shasum = 
        crypto.createHmac("sha256", process.env.WEBHOOK_SECRET);
        shasum.update(JSON.stringify(req.body));
        const freshSignature = shasum.digest('hex');
        if (freshSignature === inComingSignature) {
            console.log("Signature is valid");
            // do the further processing
            const order_id=req.body.payload.payment.entity.order_id;
            console.log("order_id",order_id);
            console.log("event",req.body.event);

            res.status(200).json({ message: "OK" });
        } else {
            // there some tempering 
            res.status(403).json({ message: "Invalid" });
        }

    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }



})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})