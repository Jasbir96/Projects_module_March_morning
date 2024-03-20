const UserModel = require("../models/UserModel");
const { createFactory } = require("../utils/resourceFactory");
/***************handler functions**********************/
const getUser = async (req, res) => {
    try {
        // template -> get the data from req.params
        const id = req.params.id;

        const user = await UserModel.findById(id);
        // if user is present -> send the resp
        if (user) {
            user.password = undefined;
            user.__v = undefined;

            if (user.confirmPassword) {
                user.confirmPassword = undefined
            }
            res.status(200).json({
                message: user
            })
            // if it's not there then send user not found 
        } else {
            res.status(404).json({
                message: "did not get the user"
            })
        }
    } catch (err) {
        res.status(500).json({
            status: "Internal server error",
            message: err.message
        })
    }

}
const getAllUser = async (req, res) => {
    try {

        const user = await UserModel.find();
        // if user is present -> send the resp
        if (user.length != 0) {
            res.status(200).json({
                message: user,
            })
            // if it's not there then send user not found 
        } else {
            res.status(404).json({
                message: "did not get any user"
            })
        }
    } catch (err) {
        res.status(500).json({
            status: "Internal server error",
            message: err.message
        })
    }

}
const createUser = createFactory(UserModel);

const updateUser = async (req, res) => {
    try {
        /***
        * 1. you will need -> id 
        * 2. you have pass the keys that they want to update
        * **/
        const id = req.params.id;
        const toUpdateObject = req.body;

        const user = await UserModel.findByIdAndUpdate(id, toUpdateObject, { new: true });

        console.log("Received patch request");
        res.json({
            status: "success",
            message: user
        })
    } catch (err) {
        res.status(500).json({
            status: "Internal server error",
            message: err.message
        })
    }

}
const deleteUser = async (req, res) => {
    try {
        let { id } = req.params;
        const user = await UserModel.findByIdAndDelete(id);
        if (user === null) {
            res.status(404).json({
                status: "sucess",
                message: "user does not exist",

            })
        } else {
            res.status(200).json({
                status: "sucess",
                message: "user is deleted",
                user: user
            })
        }


    } catch (err) {
        res.status(500).json({
            status: "Internal server error",
            message: err.message
        })
    }
}
module.exports = {
    getUser, getAllUser, createUser, updateUser, deleteUser
}


// const createUser = async (req, res) => {
//     try {
//         // id 
//         const userDetails = req.body;
//         const user = await
//             UserModel.create(userDetails);
//         console.log(req.body);
//         res.status(201).json({
//             message: "user created",
//             user: user
//         })
//     } catch (err) {
//         res.status(500).json({
//             status: "Internal server error",
//             message: err.message
//         })
//     }

// }
