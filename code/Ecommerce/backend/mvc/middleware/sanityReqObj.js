const sanityMiddleWare = (req, res, next) => {
    try {
        let body = req.body;
        let isEmpty = Object.keys(body).length == 0;
        if (isEmpty) {
            res.status(400).json({
                status: "failure",
                message: "req.body is empty"
            })
        } else {
            next()
        }
    } catch (err) {
        res.status(500).json({
            status: "failure",
            message: "Internal Server error"
        })
    }
}
module.exports = { sanityMiddleWare };