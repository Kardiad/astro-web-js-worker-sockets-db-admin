# Shopycd
## Descripción
Este proyecto es una idea de tienda de música con conciertos y tickets de éstos. La cosa y el reto real
de este proyecto es una suerte de experimentación entre sockets, de modo que la ventana maestra está 
mandando los datos en tiempo real (pero no siempre los carga en tiempo real, hay que refrescar). Respecto
a la idea del proyecto se presenta la siguiente arquitectura

![alt text](image.png)

## Requisitos
Node la última versión a día 19/12/2025 (v22.14.0) puesto que se hizo con esto
npm (11.6.3)
Tener un navegador (el que más rabia te de)


## Instalación
Simple en cada carpeta que presenta el repositorio hay que tirar el siguiente comando
npm i
Para ejecutarlo abre 3 consolas (1 por carpeta) y lanza el siguiente comando situado en 
dicha carpeta: 
```bash
    npm run dev
```
Y ya lo tienes listo para jugar

## Estructura de carpetas
tienda : ahí está el proyecto de la tienda
admin : ahí está el admin
socket: ahí está el socket.