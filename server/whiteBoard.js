const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");
const fs = require('fs')
let json = require("../client/src/ip.json");

// console.log(json.ip);



const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*", // Update with your React app's URL
    // origin: "http://localhost:3000", // Update with your React app's URL
    methods: ["GET", "POST"],
  },
});

const serverIP = json.ip;
const port = 4000;

app.use(cors());

app.get("/game", (req, res) => {
  res.status(200).send("Tic Tac Toe Game Server");
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on('canvasImage', (data) => {
    socket.broadcast.emit('canvasImage', data);
  });
});

server.listen(port, serverIP,  () => {
  console.log(`Server running at http://${serverIP}:${port}`);
});
