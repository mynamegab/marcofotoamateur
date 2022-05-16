import picturesService from "../services/pictures.service.js";

export const getPictures = async (req, res, next) => {
    try {
        res.json(await picturesService.getPictures(req.params.albumId, true));
    } catch (err) {
        next(err);
    }
};

// move out
export const getPicturesAdmin = async (req, res, next) => {
    try {
        res.json(await picturesService.getPictures(req.params.albumId, false));
    } catch (err) {
        next(err);
    }
};

export const updatePicture = async (req, res, next) => {
    try {
        res.json(await picturesService.updatePicture(req.params.albumId, req.params.pictureId, req.body));
    } catch (err) {
        next(err);
    }
};