import { v4 } from "uuid";
import sharp from 'sharp';

import { getAlbum } from "./albums.service.js";
import { uploadFile } from "./storage.service.js";

// Returns the required sharp options to resize the blob so that it is maximum the provided dimensions
const getResizeOptions = async (blob, { requiredMinHeight, requiredMinWidth }) => {
    const { width, height } = await sharp(blob).metadata();
    const actualRatio = width / height;

    const requiredRatio = requiredMinWidth / requiredMinHeight;
    if (actualRatio > requiredRatio) {
        return { height: requiredMinHeight };
    }

    return { width: requiredMinWidth };
};

// Resize initial blob to thumbnail size
// Returns the smaller blob
const resizeToDimensions = async (blob, resizeProps) => (
    await sharp(blob)
        .resize(await getResizeOptions(blob, resizeProps))
        .toBuffer()
);

// Returns the pictures found in the requested album
export const getAllPictures = async (albumId) => {
    const album = await getAlbum(albumId);
    return (album.pictures || []);
};

// Returns all non hidden pictures found in the requested album
export const getVisiblePictures = async (albumId) => {
    const pictures = await getAllPictures(albumId);
    return pictures.filter(picture => !picture.hidden);
};

// TODO: Only stream blob once
// Creates a thumbnail for the new picture, then uploads both the original and thumbnail blobs to storage
// Returns the assetId used to store the images
export const createPicture = async (albumId, title, file) => {
    const blob = file.buffer;
    const { format } = await sharp(blob).metadata();
    if (['jpg', 'jpeg', 'JPG'].indexOf(format) === -1) {
        throw {
            message: `Format no supported (${format})`,
            statusCode: 400
        };
    }

    //TODO check size

    const album = await getAlbum(albumId);

    const assetId = v4();
    
    const displayBlob = await resizeToDimensions(blob, { requiredMinHeight: 1300, requiredMinWidth: 2000 });
    const thumbnailBlob = await resizeToDimensions(blob, { requiredMinHeight: 300, requiredMinWidth: 400 });

    await uploadFile('display', assetId, format, displayBlob);
    await uploadFile('thumbnails', assetId, format, thumbnailBlob);

    album.pictures.push({
        assetId,
        title,
        hidden: true,
        format
    });

    await album.save();

    return album.pictures
        .find(picture => picture.assetId === assetId);
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

export default { createPicture, updatePicture, getAllPictures, getVisiblePictures };