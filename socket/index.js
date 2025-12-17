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
    console.log("cliente conectado", socket.id);
    socket.on("masterupdatedb", (data) => {
        io.emit("masterupdatedb", data);
    });
    socket.on("masterupdateevents", (data) => {
        io.emit("masterupdateevents", data);
    });
    socket.on("getdb", (data)=>{
        console.log(data)
        io.emit("getdb", data)
    })
    socket.on("getevents", (data)=>{
        console.log("socket get event",data)
        io.emit("getevents", data)
    })
    socket.on("updatedatabase", (data)=>{
        console.log(data);
        io.emit("updatedatabase", data)
    })
    socket.on("updatestock", (data)=>{
        io.emit("updatestock", data)
    })
    socket.on("updateevents", (data)=>{
        io.emit("updateevents", data)
    })
    socket.on("contactform", (data)=>{
        io.emit("contactform", data)
    })
    socket.on("sale", (data)=>{
        io.emit("saledata", data)
    })
});


http.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});