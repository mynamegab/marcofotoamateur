import mongoose from "mongoose";
import moment from "moment";

import Album from "../mongodb/models/Album.js";
import { createPicture } from "./pictures.service.js";

export const getAlbum = async (albumId) => {
    if (!mongoose.isValidObjectId(albumId)) {
        throw {
            message: `Album with id ${albumId} could not be found`,
            internalMessage: `Impossible to parse provided albumId(${albumId}) to ObjectId`,
            statusCode: 404
        };
    }

    return await Album.findOne({ _id: albumId });
};

let albumListCache = null;
export const getAlbums = async () => {
    if (albumListCache) {
        return albumListCache;
    }

    const albums = await Album.find({ hidden: { $ne: true } }).sort('name');

    albumListCache = albums
        .filter(album => album.pictures.length > 0)
        .map(({
            _id,
            name,
            //description,
            pictures,
            createdAt,
            //updatedAt
        }) => ({
            id: _id,
            name,
            // description,
            pictureCount: pictures.length,
            creationTimestamp: moment(createdAt).unix(),
            // lastUpdateTimestamp: moment(updatedAt).unix(),
            thumbnail: pictures[0]
        }));
    
    return albumListCache;
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

export default { getAlbums, createAlbum };