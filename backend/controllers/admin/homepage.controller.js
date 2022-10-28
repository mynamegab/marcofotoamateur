import homepageService from "../../services/homepage.service.js";

export const getHomepage = async (req, res, next) => {
    try {
        const homepage = await homepageService.getHomepage();

        res.json(homepage);
    } catch (err) {
        next(err);
    }
};

export const addPictureOfTheMoment = async (req, res, next) => {
    try {
        const { pictureId } = req.params;
        if (!pictureId) {
            throw {
                statusCode: 400,
                message: 'A pictureId should be provided'
            };
        }

        const updatedPictures = await homepageService.addPictureOfTheMoment(pictureId);

        res.json(updatedPictures);
    } catch (err) {
        next(err);
    }
};

export const removePictureOfTheMoment = async (req, res, next) => {
    try {
        const { pictureId } = req.params;
        if (!pictureId) {
            throw {
                statusCode: 400,
                message: 'A pictureId should be provided'
            };
        }

        const updatedPictures = await homepageService.removePictureOfTheMoment(pictureId);

        res.json(updatedPictures);
    } catch (err) {
        next(err);
    }
};