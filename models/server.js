const express = require('express');
const cors = require('cors');
const dbConnection = require('../database/config.db');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/user';

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Lectura y parseo del body
        this.app.use( express.json() );

        //Rutaas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use( cors() );

        //Directorio publico
        this.app.use( express.static('public'));
    }

    routes() {
        this.app.use(this.userPath, require('../routes/user.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('server listening on port', this.port);
        });
    }
}

module.exports = Server;