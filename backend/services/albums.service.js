import mongoose from "mongoose";

import Album from "../mongodb/models/Album.js";
import { createPicture } from "./pictures.service.js";

// Searches MongoDB for an album matching the provided albumId
export const getAlbum = async (albumId) => {
    if (!mongoose.isValidObjectId(albumId)) {
        throw {
            message: `Album with id ${albumId} could not be found`,
            internalMessage: `Impossible to parse provided albumId(${albumId}) to ObjectId`,
            statusCode: 404
        };
    }

    const album = await Album.findOne({ _id: albumId });
    if (album == null) {
        throw {
            message: `Album with id ${albumId} could not be found`,
            statusCode: 404
        };
    }

    return album;
};

export const getAllAlbums = async () => {
    return await Album.find({});
}

export const getAllVisibleAlbums = async () => {
    return await Album.find({ hidden: { $ne: true } });
};

export const createAlbum = async ({ name, description, initialPictures }) => {
    const pictures = [];

    // Uploading sequentially as to not overflow the storage, no idea what is its bandwidth with the trial
    for (const rawPicture of initialPictures) {
        const assetId = await createPicture(rawPicture.format, rawPicture.blob)

        pictures.push({
            assetId,
            format: rawPicture.format,
            description: rawPicture.description,
            tags: rawPicture.tags || []
        });
    }

    return await Album.create({
        name,
        description,
        pictures,
        tags: []
    });
};

export default { createAlbum, getAllAlbums, getAllVisibleAlbums, createAlbum };