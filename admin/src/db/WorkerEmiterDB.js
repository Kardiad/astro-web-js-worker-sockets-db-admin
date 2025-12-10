import { io } from "socket.io-client";
import { DataBase } from "./db";
const db = new DataBase();
const socket = io('http://localhost:3000');

socket.on("updatestock", (data) => {
    db.update("cd", data);
});

