
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { initStorage } from './services/storage.service.js';
import { initMongoDb } from './mongodb/index.js';
import { initAdminRoutes, initPublicRoutes } from './routes/index.js';

dotenv.config();

// Prepare all connections
await initStorage();
await initMongoDb();

const publicApp = express();

// Middlewares
publicApp.use(express.json());
publicApp.use(cors({ origin: true, credentials: true }));

initPublicRoutes(publicApp);

// Serve client
publicApp.use(express.static(path.join(dirname(fileURLToPath(import.meta.url)), 'dist/app/static')))
publicApp.get('*', (req, res) => {
    res.sendFile(path.join(dirname(fileURLToPath(import.meta.url)), 'dist/app/index.html'));
});

/* Error handler middleware */
publicApp.use((err, req, res, next) => {
    console.error(err.internalMessage || err.message, err.stack);

    const statusCode = err.statusCode || 500;
    res.status(statusCode)
        .json({message: err.message});
});

// Open server
const publicPort = process.env.PUBLIC_PORT;
publicApp.listen(publicPort, () => console.log(`Server running on port ${publicPort}`));


const adminApp = express();
adminApp.use(express.json());
adminApp.use(cors({ origin: true, credentials: true }));

initAdminRoutes(adminApp);

/* Error handler middleware */
adminApp.use((err, req, res, next) => {
    console.error(err.internalMessage || err.message, err.stack);

    const statusCode = err.statusCode || 500;
    res.status(statusCode)
        .json({message: err.message});
});

publicApp.use(express.static(path.join(dirname(fileURLToPath(import.meta.url)), 'dist/app/dashboard')))
adminApp.get('*', (req, res) => {
    res.sendFile(path.join(dirname(fileURLToPath(import.meta.url)), 'dist/dashboard/index.html'));
});

const adminPort = process.env.ADMIN_PORT;
adminApp.listen(adminPort, () => console.log(`Server running on port ${adminPort}`));