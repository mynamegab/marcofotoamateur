import albumService from "../../services/albums.service.js";

export const getAlbums = async (req, res, next) => {
    try {
        const albums = await albumService.getAllAlbums();
        res.json(albums);
    } catch (err) {
        next(err);
    }
};

export const createAlbum = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) {
            throw {
                statusCode: 400,
                message: 'A name should be provided to create an album'
            };
        }

        const album = await albumService.createAlbum({ name });
        res.json(album);
    } catch (err) {
        next(err);
    }
};

export const updateAlbum = async (req, res, next) => {
    try {
        const { albumId } = req.params;
        if (!albumId) {
            throw {
                statusCode: 400,
                message: 'An albumId should be provided to update a picture'
            };
        }

        const album = await albumService.updateAlbum(albumId, req.body);
        res.json(album);
    } catch (err) {
        next(err);
    }
};

export const deleteAlbum = async (req, res, next) => {
    try {
        const { albumId } = req.params;
        if (!albumId) {
            throw {
                statusCode: 400,
                message: 'An albumId should be provided to delete an album'
            };
        }

        await albumService.deleteAlbum(albumId);

        res.json({ message: "ok "});
    } catch (err) {
        next(err);
    }
};