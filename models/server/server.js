const express = require('express')
const cors = require('cors');
const { socketController } = require('../../sockets/controller');



// const path = require('path');

/**
 * Clase que va a ejecutar la inicializacion de todo lo que se necesita al arrancar la aplicacion (el servidor)
 */
class Server {

    /**
     *  Middlewares -> funciones que añaden funcionalidad al webserver, 
     *   Middlewares -> funcion que siempre va a ejecutarse cuando levantemos nuestra aplicacion
     */
    constructor() {

        // almacenamos en app la instancia de express
        this.app = express()

        // Creacion del server en particular
        this.server = require('http').createServer(this.app);

        // creacion de la parte del servidor para socke ( se obtiene toda la infomacion de los clientes conectados)
        this.io = require('socket.io')(this.server);

        // Generar el puerto de la aplicacion
        this.port = process.env.PORT

        // Rutas globales al utilizar en la aplicacion
        this.paths = {
            
        }

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes()

        // Sockets
        this.sockets()
    }

    // middlewares necesarios para la aplicacion
    middlewares() {

        // CORS
        this.app.use(cors())

        // Directorio publico -> se reconoce los middlewares por la palabra reservada use()
        this.app.use(express.static('public'))

    }

    // Rutas de la aplicacion
    routes() {

        // this.app.use(this.paths.auth, require('../routes/auth'))
    }

    sockets(){

        this.io.on('connection', socketController)

    }

    // Metodo que le permite a nuestro servidor escuchar peticiones
    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port)
        })
    }

}

module.exports = Server;