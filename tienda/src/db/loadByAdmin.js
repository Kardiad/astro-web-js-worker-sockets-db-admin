//Este script de mierda va a ser una paja mental que lo que va ahacer es simple y llanamente cargar los datos de forma paralela conectando de 
//Y obteniendo el grueso de lo que se llene en el admin, pasado en tiempo real a través del protocolo udp en el que un socket escribe el mayor 

import { io } from "socket.io-client";
import { DataBase } from "./db";

//porro y la cosa más inútil que he podido escribir en mi vida, pero como estamos haciendo algo lo más frontend posible, pues eso.
const db = new DataBase();
const socket = io('http://localhost:3000');
globalThis.socket = socket;
//llama para obtener los cds de la base de datos
socket.emit('getdb', {
    updatedatabase: true
})
//llama para obtener los eventos de la base de datos
socket.emit('getevents', {
    updateevents: true
})
socket.on("updatedatabase", (data)=>{
    console.log(data);
    for(let item of data){
        db.writeAsync('cd', item)
    }
})
socket.on("updateevents", (data)=>{ 
    console.log(data)   
    for(let item of data){
        db.writeAsync('events', item)
    }
})
socket.on("contactform", (data)=>{
    console.log("contact form data received in loadByAdmin:", data);
    db.writeAsync('suggestions', data)
})

//Aquí van los envíos de peticiones al socket para pasarle info al admin
onmessage = (event) => {
    if(event.data.action == 'contactform'){
        socket.emit('contactform', event.data.data)
    }
    if(event.data.action == 'getconnecotor'){
        postMessage({
            dbconnection: db
        })
    }
}
