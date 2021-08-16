import Server from './classes/server';
import router from './routes/router';
import express from 'express';
import cors from 'cors';

import dbConnection from './database/config';


const server = Server.instance;


server.app.use( express.urlencoded( { extended: true } ));
server.app.use( express.json() );
server.app.use( cors({ origin: true, credentials: true }) );

dbConnection();

server.app.use( '/', router );





server.start(() => {
    console.log( `Servidor corriendo en el puerto ${ server.port }` );
});
