import mongoose from "mongoose";
import Album from "../mongodb/models/Album.js";

import Homepage from "../mongodb/models/Homepage.js";
import { pictureExists } from "./pictures.service.js";

const GLOBAL_ID = "global";

export const getPicturesOfTheMoment = async () => {
    const homepage = await getHomepage();
    return homepage?.picturesOfTheMoment || [];
};

export const addPictureOfTheMoment = async (pictureId) => {
    await validatePictureExists(pictureId);

    const homepage = await getHomepage();
    const pictures = homepage?.picturesOfTheMoment || [];

    if (pictures.find(picture => picture.pictureId === pictureId)) {
        throw {
            statusCode: 409,
            message: 'Picture is already in the pictures of the day list'
        };
    }

    pictures.push({ pictureId });

    homepage.picturesOfTheMoment = pictures;

    await homepage.save()

    return homepage.picturesOfTheMoment;
};

export const getLastCreatedPictures = async () => {
    const albums = await Album.find().sort({ 'pictures.createdAt': -1 }).limit(10);
    const pictures = albums
        .reduce((prev, curr) => prev.concat(curr.pictures || []), [])
        .sort((a, b) => b.createdAt - a.createdAt)
        .splice(0, 10);

    return pictures;
}

export const removePictureOfTheMoment = async (pictureId) => {
    await validatePictureExists(pictureId);

    const homepage = await getHomepage();
    const pictures = homepage?.picturesOfTheMoment || [];

    homepage.picturesOfTheMoment = pictures.filter(picture => picture.pictureId !== pictureId);

    await homepage.save()

    return homepage.picturesOfTheMoment;
};

export const getHomepage = async () => {
    const homepage = await Homepage.findOne({ id: GLOBAL_ID });
    if (!homepage) {
        return await Homepage.create({
            id: GLOBAL_ID,
            picturesOfTheMoment: []
        });
    }

    return homepage;
};

const validatePictureExists = async (pictureId) => {
    if (!mongoose.isValidObjectId(pictureId)) {
        throw {
            message: 'The provided pictureId does not match any existing picture',
            internalMessage: `Impossible to parse provided pictureId(${pictureId}) to ObjectId`,
            statusCode: 400
        };
    }

    if (!await pictureExists(pictureId)) {
        throw {
            statusCode: 400,
            message: 'The provided pictureId does not match any existing picture'
        };
    }
};

export default {
    getPicturesOfTheMoment,
    addPictureOfTheMoment,
    removePictureOfTheMoment,
    getHomepage,
};