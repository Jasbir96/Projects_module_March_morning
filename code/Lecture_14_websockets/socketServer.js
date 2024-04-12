const express = require('express');
const app = express();
const http = require('http');
// http server -> 
const nodeServer = http.createServer(app);

const socketTemplate = require('socket.io').Server;

app.use(express.static("client"));




















/****
 * user -> current socket
 * */


// socket server
const socketServer = new socketTemplate(nodeServer);
// if you want to listen to an event -> on
socketServer.on("connection", function (socket) {
    // whenever a new connection is made -> it will console it 
    console.log('New Connection', socket.id);

    socket.on("disconnect", () => {
        console.log('disconnected ', socket.id);
    })



    // if you want to send that event -> emit
    // setInterval(() => {
    //     socket.emit("serv_message", `message from server`);
    // }, 2000);
    // broadcast message
    socket.on("message", function (data) {
        // broadcast message
        socket.broadcast.emit("broadcast", data)
    })

    // -> send th message , reciever ->
    socket.on("private", function ({ message, recieverSocket }) {
        console.log("data", message, recieverSocket)
        socket
            .broadcast
            .to(recieverSocket)
            .emit("personal", message);
    })

    // rooms -> room will be a random Id
    // socket.join(room)
    // socket.to(room).emit("serv_grp_message", message)
});

























app.get("/", (req, res) => {
    res.send("<h1>Socket Server</h1>");
})
// listen through node server
nodeServer.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})