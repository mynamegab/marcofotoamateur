import picturesService from "../services/pictures.service.js";

export const getPictures = async (req, res, next) => {
    try {
        res.json(await picturesService.getPictures(req.params.albumId));
    } catch (err) {
        next(err);
    }
};

export const updatePicture = async (req, res, next) => {
    try {
        console.log("Update Picture")
        res.json({});
    } catch (err) {
        next(err);
    }
};