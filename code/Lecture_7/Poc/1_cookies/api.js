const express = require("express");
const app = express();




// i will set a cookie here 
app.get("/", function (req, res) {

})

// i will check whether the user visiting for the first or it has already visited
app.get("/product", function (req, res) {
    
})

// clear your cookies -> on a server
app.get("/clearCookies", function (req, res) {
 

})

app.listen(3000, function () {
    console.log(` server is listening to port 3000`);
})