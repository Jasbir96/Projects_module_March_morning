const UserModel = require("../models/UserModel")
const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;
const promisifiedJWTVerify = promisify(jwt.verify);
const { JWT_SECRET } = process.env;
// remove these code to  different file
const protectRouteMiddleWare = async function (req, res, next) {
    try {
        let jwttoken = req.cookies.JWT;
        let decryptedToken = await promisifiedJWTVerify(jwttoken, JWT_SECRET);
        if (decryptedToken) {
            let userId = decryptedToken.id;
            // adding the userId to the req object
            req.userId = userId
            next();
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure"
        })

    }
}
const checkIfAdminMiddleWare = async function (req, res, next) {
    try {
        const id = req.userId;
        // find the user by id 
        const user = await UserModel.findById(id);
        if (user.role == "admin") {
            next();
        } else {
            res.status(403).json({
                message: "You are not authorized to access this route",
                status: "failure"
            })
        }
    } catch (err) {
        res.status(500).json({
            error: err.message,
            status: "failure"
        })
    }
}
const checkForValidRolesMiddleWare = (allowedRolesList) => {
    return async function (req, res, next) {
        try {
            const id = req.userId;
            // find the user by id 
            const user = await UserModel.findById(id);
            if (allowedRolesList.includes(user.role)) {
                next();
            } else {
                res.status(403).json({
                    message: "You are not authorized to access this route",
                    status: "failure"
                })
            }
        } catch (err) {
            res.status(500).json({
                error: err.message,
                status: "failure"
            })
        }
    }
}
module.exports = {
    protectRouteMiddleWare,
    checkIfAdminMiddleWare,
    checkForValidRolesMiddleWare
}