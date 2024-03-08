const http = require("http");
const server = http.createServer();
/****
 * req -> this represents the request
 * res -> this reprsenst the res obj
 * */

server.on("request", function (req, res) {
    /**
     * url -> diffrentiate different feature
     // console.log("url",req.url);
     * **/
    
    if (req.url == "/profile") {
        res.end("data of profile");
    } else if (req.url == "/about") {
        res.end("data of about");
    }else{
        res.end("404 url not found");
    }
    console.log("handler will execute");
})
// to identify a machine over network-> ip address 
//  port -> uniquely identify a server in a machine
const PORT = 3000;
server.listen(PORT, () => {
    console.log("Server is running at port " + PORT);
})

/***
 * npm init -y
 * npm install nodemon
 * */ 
