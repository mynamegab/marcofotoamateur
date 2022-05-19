import picturesService from "../../services/pictures.service.js";

const mapPictureToDto = ({
    assetId,
    description,
    format,
    _id,
    hidden,
    title
}) => ({
    id: _id,
    assetId,
    description,
    format,
    hidden,
    title
});

export const getPictures = async (req, res, next) => {
    try {
        const pictures = await picturesService.getVisiblePictures(req.params.albumId);
        const pictureDtos = pictures.map(mapPictureToDto);

        res.json(pictureDtos);
    } catch (err) {
        next(err);
    }
};