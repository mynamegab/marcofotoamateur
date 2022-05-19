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
const createThumbnail = async (blob) => (
    await sharp(blob)
        .resize(await getThumbailResizeOptions(blob))
        .toBuffer()
);

// Returns the pictures found in the requested album
export const getAllPictures = async (albumId) => {
    const album = await getAlbum(albumId);
    return (album.pictures || []);
};

// Returns all non hidden pictures found in the requested album
export const getVisiblePictures = async (albumId) => {
    const album = await getAlbum(albumId);
    return (album.pictures || [])
        .filter(picture => !picture.hidden);
};

// Creates a thumbnail for the new picture, then uploads both the original and thumbnail blobs to storage
// Returns the assetId used to store the images
export const createPicture = async (format, blob) => {
    const assetId = v4();
    
    const thumbnailBlob = await createThumbnail(blob);

    await uploadImage('thumbnails', assetId, format, thumbnailBlob);

    // TODO: display instead of images and make smaller
    await uploadImage('images', assetId, format, blob);
    
    return assetId;
};

const isTitleUpdateRequestValid = (title) => {
    return (
        // Set title
        (typeof title === 'string' && title.length)
        // Clear title
        || title === null
    );
}

export const updatePicture = async(albumId, pictureId, request) => {
    const album = await getAlbum(albumId);
    
    const picture = album.pictures.id(pictureId);
    if (!picture) {
        throw {
            message: `Album with id ${albumId} does not contain picture with id ${pictureId}`,
            statusCode: 404
        };
    }

    if (request.hasOwnProperty('hidden') && typeof request.hidden === 'boolean') {
        picture.hidden = request.hidden;
    }

    if (request.hasOwnProperty('title') && isTitleUpdateRequestValid(request.title)) {
        picture.title = request.title;
    }

    await album.save();

    return picture;
};

export default { createPicture, updatePicture, getAllPictures, getVisiblePictures }