const express = require("express");
const fs = require("fs");
const app = express();

// Function to handle GET request for user data
function readUserDataFromFile(filePath) {
    const strUsersData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(strUsersData);
}

// Function to read user data from file
function handleGetUserData(req, res) {
    /***this functions should written the learner*/
    console.log("Thank you for making a GET request");
    try {
        const userDataStore = readUserDataFromFile("./dev-data.json");
        console.log(userDataStore)
        let message = userDataStore.length === 0 ? "no users found" : userDataStore;
        if (message == "no users found") {
            return res.status(404).json({
                status: "successful",
                message: message,
            });
        }

        res.status(200).json({
            status: "successful",
            message: message,
        });
    } catch (error) {
        console.error("Error reading user data:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
}

app.get("/api/user", handleGetUserData);

// 1. 
app.get("/", function (req, res) {

    res.status(200).json({
        message: "Thanks for sending the request"
    })

})

if (process.env.MODE == "DEV" || process.env.MODE == "PROD") {

    app.listen(3000, () => {
        console.log(`server is listening at PORT ${3000}`);
    });
} else {
    console.log("some logic for testing");
    module.exports = app;
}


/***
 * mode =testing
 * mode =dev 
 * ***/ 