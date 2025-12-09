const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");

const io = new Server(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("cliente conectado");
    socket.on("masterupdatedb", (data) => {
        console.log(data);
        io.emit("masterupdatedb", data);
    });
    socket.on("getdb", (data)=>{
        console.log(data)
        io.emit("getdb", data)
    })
    socket.on("updatedatabase", (data)=>{
        console.log(data);
        io.emit("updatedatabase", data)
    })
    socket.on("updatestock", (data)=>{
        io.emit("updatestock", data)
    })
});


http.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});