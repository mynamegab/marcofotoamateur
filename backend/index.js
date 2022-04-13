
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { initStorage } from './services/storage.service.js';
import { initMongoDb } from './mongodb/index.js';
import { initRoutes } from './routes/index.js';

dotenv.config();

// Prepare all connections
await initStorage();
await initMongoDb();

const app = express();

// Middlewares
app.use(express.json({ extended: false }));
app.use(cors({ origin: true, credentials: true }));

initRoutes(app);

// Serve client
app.use(express.static('dist'))
app.get('*', (req, res) => {
    res.sendFile(path.join(dirname(fileURLToPath(import.meta.url)), 'dist/index.html'));
});

/* Error handler middleware */
app.use((err, req, res, next) => {
    console.error(err.internalMessage || err.message, err.stack);

    const statusCode = err.statusCode || 500;
    res.status(statusCode)
        .json({message: err.message});
});

// Open server
const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));