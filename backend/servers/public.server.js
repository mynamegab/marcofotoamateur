import express from 'express';
import cors from 'cors';
import path from 'path';

import { initPublicRoutes } from '../routes/index.js';
import errorhandler from '../middlewares/errorhandler.js';

let server;

export const initPublicServer = (dirname) => {
    if (server) {
        log.error("Public app is already running");
        return;
    }

    server = express();

    server.use(express.json());
    server.use(cors({ origin: true, credentials: true }));
    
    initPublicRoutes(server);
    
    // Serve client & assets
    server.use(express.static(path.join(dirname, 'dist/app')));
    server.get('*', (req, res) => {
        res.sendFile(path.join(dirname, 'dist/app/index.html'));
    });
    
    server.use(errorhandler);
    
    // Open server
    const publicPort = process.env.PUBLIC_PORT;
    server.listen(publicPort, () => console.log(`Public server running on port ${publicPort}`));
};