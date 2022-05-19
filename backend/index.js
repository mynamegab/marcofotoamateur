
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { initStorage } from './services/storage.service.js';
import { initMongoDb } from './mongodb/index.js';
import { initPublicServer } from './servers/public.server.js';
import { initAdminServer } from './servers/admin.server.js';

// Load environment variables
dotenv.config();

// Prepare all connections
await initStorage();
await initMongoDb();

// Init servers
const __dirname__ = dirname(fileURLToPath(import.meta.url));
initAdminServer(__dirname__);
initPublicServer(__dirname__);