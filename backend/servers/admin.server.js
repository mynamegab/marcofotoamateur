
import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';

import { initAdminRoutes } from '../routes/index.js';
import errorhandler from '../middlewares/errorhandler.js';

let server;

export const initAdminServer = (dirname) => {
    if (server) {
        log.error("Admin app is already running");
        return;
    }

    server = express();

    server.use(bodyParser.json({ limit: '100mb' }));
    server.use(cors({ origin: true, credentials: true }));
    
    initAdminRoutes(server);
    
    // Serve client & assets
    server.use(express.static(path.join(dirname, 'dist/dashboard')));
    server.get('*', (req, res) => {
        res.sendFile(path.join(dirname, 'dist/dashboard/index.html'));
    });
    
    server.use(errorhandler);
    
    // Open server
    const adminPort = process.env.ADMIN_PORT;
    server.listen(adminPort, () => console.log(`Admin server running on port ${adminPort}`));
};