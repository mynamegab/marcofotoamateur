import albumService from "../../services/albums.service.js";

export const getAlbums = async (req, res, next) => {
    try {
        res.json(await albumService.getAlbums());
    } catch (err) {
        next(err);
    }
};

export const createAlbum = async (req, res, next) => {
    try {
        console.log("Create Album")
        res.json({});
    } catch (err) {
        next(err);
    }
};

export const updateAlbum = async (req, res, next) => {
    try {
        console.log("Update Album")
        res.json({});
    } catch (err) {
        next(err);
    }
};