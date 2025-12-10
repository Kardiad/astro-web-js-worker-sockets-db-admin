export class DataBase {

    dbName = "cdProyect";

    dbVersion = 2;

    dbConnection;

    statement;

    //Aquí tenemos la creación de la base de datos
    constructor() {
        this.dbConnection = globalThis.indexedDB.open(this.dbName, this.dbVersion);
        this.dbConnection.onupgradeneeded = (event) => {
            console.log("Creando db... cdProyect")
            this.statement = event.target.result;
            if (!this.statement.objectStoreNames?.contains("cd")) {
                event.target.result.createObjectStore("cd", {
                    keyPath: "id",
                    autoIncrement: true
                })
            }
            if (!this.statement.objectStoreNames?.contains("events")) {
                event.target.result.createObjectStore("events", {
                    keyPath: "id",
                    autoIncrement: true
                })
            }
            if (!this.statement.objectStoreNames?.contains("suggestions")) {
                event.target.result.createObjectStore("suggestions", {
                    keyPath: "id",
                    autoIncrement: true
                })
            }
        }
        this.dbConnection.onsuccess = (event) => {
            this.statement = event.target.result;
            console.log("Conexión abierta", event.target.result);
        }
        this.dbConnection.onerror = (event) => {
            console.log("Error de conexión", event.target.result)
        }
    }

    build = () => {
        return new Promise(
            (resolve, reject) => {
                const dbConnection = globalThis.indexedDB.open(this.dbName, this.dbVersion);
                dbConnection.onupgradeneeded = (event) => {
                    if (!event.target.result.objectStoreNames?.contains("cd")) {
                        event.target.result.createObjectStore("cd", {
                            keyPath: "id",
                            autoIncrement: true
                        })
                    }
                    if (!this.statement.objectStoreNames?.contains("events")) {
                        event.target.result.createObjectStore("events", {
                            keyPath: "id",
                            autoIncrement: true
                        })
                    }
                    if (!this.statement.objectStoreNames?.contains("suggestions")) {
                        event.target.result.createObjectStore("suggestions", {
                            keyPath: "id",
                            autoIncrement: true
                        })
                    }
                }
                dbConnection.onsuccess = (event) => {
                    resolve(event.target.result);
                    this.statement = event.target.result
                    console.log("Conexión abierta", event.target.result);
                }
                dbConnection.onerror = (event) => {
                    console.log("Error de conexión", event.target.result)
                }
            })
    }

    read = (table) => {
        return this.build()
            .then((resolve) => {
                return new Promise(
                    (resolve, reject) => {
                        let result = [];
                        const transaction = this.statement.transaction([table], "readonly");
                        const store = transaction.objectStore(table);
                        const request = store.getAll();
                        request.onsuccess = () => {
                            resolve(request.result)
                        }
                        request.onerror = () => {
                            reject(request.error);
                        };

                    }
                )
            })

    }

    delete = (table, data) => {
        const transaction = this.statement.transaction([table], "readwrite");
        const store = transaction.objectStore(table);

        const request = store.delete(data.id); // <-- aquí borrar
        request.onsuccess = () => {
            console.log("Registro borrado correctamente");
        };

        request.onerror = (event) => {
            console.error("Error al borrar", event.target.error);
        };
    }

    update = (table, data) => {
        const transaction = this.statement.transaction([table], "readwrite");
        const store = transaction.objectStore(table);

        const request = store.put(data); // <-- aquí actualiza

        request.onsuccess = () => {
            console.log("Registro actualizado correctamente");
        };

        request.onerror = (event) => {
            console.error("Error al actualizar", event.target.error);
        };
    }

    writeAsync = (table, data, callback) => {
        return this.build()
            .then((db) => {
                console.log(db.transaction)
                return new Promise(() => {
                    const transaction = db.transaction([table], "readwrite");
                    const store = transaction.objectStore(table);
                    const request = store.add(data);
                    request.onsuccess = () => {
                        callback();
                        console.log(`inserción de ${table} se ha realizado correctamente`)
                    }
                    request.onerror = (event) => {
                        console.log(`No funcionó correctamente`, event.target.error)
                    }
                })
            })
    }

    write = (table, data) => {
        const transaction = this.statement.transaction([table], "readwrite");
        const store = transaction.objectStore(table);
        const request = store.add(data);
        request.onsuccess = () => {
            console.log(`inserción de ${table} se ha realizado correctamente`)
        }
        request.onerror = (event) => {
            console.log(`No funcionó correctamente`, event.target.error)
        }
    }
}