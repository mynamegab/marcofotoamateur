import { Storage } from '@google-cloud/storage';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import { provideStorageConfig } from '../configs/storage.js';

let storage = null;

// Connects to cloud storage and makes sure that the required bucket exists
export const initStorage = async () => {
    const config = provideStorageConfig();

    storage = new Storage({
        keyFilename: path.join(dirname(fileURLToPath(import.meta.url)), '../configs/cloud-storage.json'),
        projectId: config.projectId
    });

    const buckets = (await storage.getBuckets())[0];
    if (buckets.length == 0) {
        throw "Storage does not contain any bucket.";
    }

    if (buckets.findIndex(bucket => bucket.name === config.bucketName) === -1) {
        throw `Could not find required bucket in Google Cloud Storage (Required bucket: ${config.bucketName}).`;
    }

    console.log('Successfully connected to Google Cloud Storage.');
};

// Uploads a new file to the google cloud bucket
export const uploadFile = async (folder, name, format, data) => {
    const config = provideStorageConfig();

    const path = `${folder}/${name}.${format}`;
    console.log('Uploading to ' + path);

    await storage.bucket(config.bucketName)
        .file(path)
        .save(data);
};