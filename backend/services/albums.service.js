import mongoose from "mongoose";

import Album from "../mongodb/models/Album.js";

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
};

export const getAllVisibleAlbums = async () => {
    return await Album.find({ hidden: { $ne: true } });
};

export const createAlbum = async ({ name }) => {
    const album = await Album.create({
        name,
        tags: [],
        pictures: [],
        hidden: true
    });

    console.log("Created new album:" + album);
    return album;
};

const isNameUpdateRequestValid = (name) => {
    return (
        // Update name
        (typeof name === 'string' && name.length)
    );
}

export const updateAlbum = async (albumId, request) => {
    const album = await getAlbum(albumId);
    if (request.hasOwnProperty('hidden') && typeof request.hidden === 'boolean') {
        album.hidden = request.hidden;
    }

    if (request.hasOwnProperty('name') && isNameUpdateRequestValid(request.name)) {
        album.name = request.name;
    }

    await album.save();

    return album;
};

export const deleteAlbum = async (albumId) => {
    // TODO : REMOVE PICTURES FROM STORAGE
    await Album.deleteOne({ _id: albumId });
};

export default { createAlbum, getAlbum, getAllAlbums, getAllVisibleAlbums, updateAlbum, deleteAlbum };