🛍️ Tienda VCV con IndexedDB y Socket.IO
📌 Descripción del Proyecto

Este proyecto implementa una tienda online utilizando una arquitectura basada en Vista – Controlador – Vista (VCV). La intención de este proyecto es simplemente aprender websockets 
y alguna cosa referente a la base de datos local. La Vista Servidor cumple el rol fundamental de orquestadora, gestionando estados, datos y sincronización entre la Vista Cliente, el Controlador y otras vistas.

Además, el sistema incluye:

Panel de administración

WebSocket en tiempo real con Socket.IO

Persistencia en el navegador mediante IndexedDB

🧱 Arquitectura: Vista – Controlador – Vista (VCV)
Vista Cliente → Controlador → Vista Servidor (Orquestadora) → Resto de Vistas

🔹 Vista Cliente

Es la interfaz principal con la que interactúan los usuarios.
Funciones:

Solicitudes al Controlador

Renderizado dinámico

Conexión con Socket.IO

Lectura de eventos orquestados por la Vista Servidor

🔹 Controlador

Procesa la lógica de negocio y coordina las peticiones entre cliente, servidor y la vista orquestadora.

🔹 Vista Servidor (Orquestadora)

El componente clave.

Gestiona IndexedDB para almacenar estados y datos:

Configuraciones

Datos temporales

Estados de vista

Caché de productos

Sincroniza información hacia:

Vista Cliente

Vista Administrador

Módulos independientes

Expone métodos que otras vistas consultan para obtener estado global

🗄️ IndexedDB como Almacén Local de la Vista Servidor

La Vista Servidor utiliza IndexedDB para almacenar datos de manera persistente directamente en el cliente, pero bajo control del servidor-render.

Datos almacenados en IndexedDB:

Listado de productos cacheados

Preferencias del administrador

Tokens de sesión local

Estados de UI

Eventos pendientes para sincronización vía Socket.IO

Ejemplo básico de estructura IndexedDB:
const request = indexedDB.open("tienda_vcv", 1);

request.onupgradeneeded = (event) => {
  const db = event.target.result;

  db.createObjectStore("productos", { keyPath: "id" });
  db.createObjectStore("sesion", { keyPath: "clave" });
  db.createObjectStore("eventos", { autoIncrement: true });
};

📡 WebSocket con Socket.IO

La comunicación en tiempo real permite:

Actualización instantánea del stock

Notificación de nuevos productos

Sincronización automática entre vistas cliente

Panel del administrador mostrando actividad en tiempo real

Envío de eventos desde IndexedDB hacia el servidor cuando vuelve la conexión

Ejemplo de socket en Vista Servidor (Orquestadora):
io.on("connection", (socket) => {
  socket.emit("sync-request");

  socket.on("evento-pendiente", (data) => {
    io.emit("evento-actualizado", data);
  });
});

🛠️ Funcionalidades Principales del Proyecto
🛒 Para Usuario (Tienda)

Listado de productos

Carrito sincronizado

Actualización en tiempo real

Caché de productos en IndexedDB

🔐 Para Administrador

Gestión completa de productos

Dashboard en tiempo real

Control del inventario

Vista orquestada por la Vista Servidor

🔄 Sincronización Inteligente

El sistema combina:

IndexedDB para caché y persistencia local

Socket.IO para datos en tiempo real

Controladores para lógica del negocio

Vista Servidor para orquestar el estado global

📂 Estructura Sugerida del Proyecto
/src
 ├── views
 │    ├── cliente
 │    ├── administrador
 │    └── servidor   ← orquestadora con IndexedDB
 ├── controllers
 │    ├── productosController.js
 │    └── adminController.js
 ├── socket
 │    └── socketHandler.js
 ├── public
 │    ├── js
 │    │    ├── indexeddb.js
 │    │    ├── cliente.js
 │    │    └── admin.js
 │    └── css
 ├── models
 ├── routes
 └── app.js

🚀 Ejecución del Proyecto
npm install
npm start


Abrir:

http://localhost:3000

📄 Licencia

Proyecto disponible para uso académico y desarrollo personal.

Desarrollado por Jafet
