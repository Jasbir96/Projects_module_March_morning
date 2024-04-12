// this will be always used to send(emit) or recieve(on) message
const socket = io("http://localhost:3000");



const sendBtn = document.querySelector(".send");
const messageInput = document.querySelector(".msg");
const messageList = document.querySelector(".messages");
/*****************broadcast*******************************/
// send the message
sendBtn.addEventListener("click", function () {
    //   update the things on ui 
    if (messageInput.value == "") return;
    const sender = document.createElement("div");
    sender.setAttribute("class", "sender");
    sender.innerText = `You : ${messageInput.value}`;
    messageList.appendChild(sender);
    socket.emit("message", messageInput.value);
    messageInput.value = "";
})

// recieveing the message
socket.on("broadcast", function (data) {
    const reciever = document.createElement("div");
    reciever.setAttribute("class", "reciever");
    reciever.innerText = data;
    messageList.appendChild(reciever);

})
/****************private message************************/

const recieverSocket = document.querySelector(".reciversocket");
const addSocketBtn = document.querySelector(".addsocket");

addSocketBtn.addEventListener("click", () => {
    if (messageInput.value == "") return;
    if (recieverSocket.value == "") return;
    socket.emit("private", {
        message: messageInput.value,
        recieverSocket: recieverSocket.value
    });
    messageInput.value = "";
    recieverSocket.value = "";
});

socket.on("personal", function (data) {
    const reciever = document.createElement("div");
    reciever.setAttribute("class", "reciever");
    reciever.innerText = `private : ${data}`;
    messageList.appendChild(reciever);
})