const UserModel = require("../../models/UserModel");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "../", "../", "../", ".env") });
const { DB_USER, DB_PASSWORD } = process.env;
function seedProductData(Model) {
    /**********env variables **********/

    /*****connect to the DB******/
    const dbUrl =
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.drcvhxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    mongoose.connect(dbUrl)
        .then(function (conn) {
            // go to all the user -> and then update there password using bcrypt
            return Model.find()
        }).then(async (userList) => {
            for (let i = 0; i < userList.length; i++) {
                const user = userList[i];
                const hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword;
                user.confirmPassword = undefined;
                await user.save({ validateBeforeSave: false });
            }
        })
        .then(() => {
            console.log("password update  successfully");
        })
        .catch(err => console.log(err))
        .finally(() => {
            mongoose.disconnect();
            console.log("connection closed");
        })
}
seedProductData(UserModel);
