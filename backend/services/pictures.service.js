import { v4 } from "uuid";
import sharp from 'sharp';

import { getAlbum } from "./albums.service.js";
import { uploadImage } from "./storage.service.js";

// Returns the required sharp options to resize the blob so that it is at least
// 300px high and 400px wide
const getThumbailResizeOptions = async (blob) => {
    const { width, height } = await sharp(blob).metadata();
    const actualRatio = width / height;

    const requiredMinHeight = 300;
    const requiredMinWidth = 400;
    const requiredRatio = requiredMinWidth / requiredMinHeight;

    if (actualRatio > requiredRatio) {
        return { height: requiredMinHeight };
    }

    return { width: requiredMinWidth };
};

// Resize initial blob to thumbnail size
// Returns the smaller blob
export const createThumbnail = async (blob) => (
    await sharp(blob)
        .resize(await getThumbailResizeOptions(blob))
        .toBuffer()
);

// Returns the pictures found in the requested album
export const getPictures = async (albumId, filterHidden) => {
    const album = await getAlbum(albumId);
    return (album.pictures || [])
        .filter(picture => !filterHidden || !picture.hidden)
        .map(({ assetId, description, format, _id, hidden }) => ({ id: _id, assetId, description, format, hidden }));
};

// Creates a thumbnail for the new picture, then uploads both the original and thumbnail blobs to storage
// Returns the assetId used to store the images
export const createPicture = async (format, blob) => {
    const assetId = v4();
    
    const thumbnailBlob = await createThumbnail(blob);

    await uploadImage('thumbnails', assetId, format, thumbnailBlob);
    await uploadImage('images', assetId, format, blob);
    
    return assetId;
};

export const updatePicture = async(albumId, pictureId, request) => {
    const album = await getAlbum(albumId);

    let updatedPicture;
    album.pictures = album.pictures.map(picture => {
        if (picture._id.toString() === pictureId) {
            updatedPicture = picture;
            if (request.hasOwnProperty('hidden')) {
                picture.hidden = request.hidden;
            }
        }

        return picture;
    });

    if (!updatedPicture) {
        throw {
            message: `Album with id ${albumId} does not contain picture with id ${pictureId}`,
            statusCode: 404
        };
    }

    await album.save();

    return updatedPicture;
};

export default { createPicture, getPictures, updatePicture }