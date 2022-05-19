import picturesService from "../../services/pictures.service.js";

export const getPictures = async (req, res, next) => {
    try {
        const pictures = await picturesService.getAllPictures(req.params.albumId);
        res.json(pictures);
    } catch (err) {
        next(err);
    }
};

export const updatePicture = async (req, res, next) => {
    try {
        const { albumId, pictureId } = req.params;
        if (!albumId) {
            throw {
                statusCode: 400,
                message: 'An albumId should be provided to update a picture'
            };
        }

        if (!pictureId) {
            throw {
                statusCode: 400,
                message: 'A pictureId should be provided to update a picture'
            };
        }

        const updatedPicture = await picturesService.updatePicture(albumId, pictureId, req.body);

        res.json(updatedPicture);
    } catch (err) {
        next(err);
    }
};