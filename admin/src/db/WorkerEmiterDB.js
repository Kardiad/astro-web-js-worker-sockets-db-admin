import { io } from "socket.io-client";
import { DataBase } from "./db";
const db = new DataBase();
const socket = io('http://localhost:3000');


socket.on("updatestock", (data) => {
    db.update("cd", data);
});

socket.on("getdb", (data) => {
    if (data.updatedatabase) {
        db.read("cd").then((result) => {
            socket.emit("updatedatabase", result);
        });
    }
});

socket.on("getevents", (data) => {
    if (data.updateevents) {
        db.read("events").then((events) => {
            socket.emit("updateevents", events)
        })
    }
})

socket.on("contactform", (data) => {
    db.writeAsync('suggestions', data, () => { })
})

socket.on("sale", (data) => {
    for (let item of data) {
        if (item.coords) {
            db.update('events', item)
        } else {
            db.update('cd', item)
        }
    }
    socket.emit('getdb', {
        updatedatabase : true
    })
})

onmessage = (event) => {
    if (event.data.action == 'masterupdatedb') {
        socket.emit("masterupdatedb", event.data.data);
    }
    if (event.data.action == 'updateevents') {
        socket.emit("updateevents", event.data.data);
    }
}