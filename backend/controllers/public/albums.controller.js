import moment from 'moment';

import albumService from "../../services/albums.service.js";

const getThumbnailDto = (pictures) => {
    const firstVisiblePicture = pictures.find(({ hidden }) => !hidden);
    if (!firstVisiblePicture) {
        return null;
    }

    return {
        assetId: firstVisiblePicture.assetId,
        format: firstVisiblePicture.format
    };
};

const mapAlbumToDto = ({
    _id,
    name,
    pictures,
    createdAt
}) => ({
    id: _id,
    name,
    pictureCount: pictures.filter(picture => !picture.hidden).length,
    creationTimestamp: moment(createdAt).unix(),
    thumbnail: getThumbnailDto(pictures)
});

export const getAlbums = async (req, res, next) => {
    try {
        const albums = await albumService.getAllVisibleAlbums();
        const albumDtos = albums
            .filter(album => album.pictures.length > 0)
            .map(mapAlbumToDto);

        res.json(albumDtos);
    } catch (err) {
        next(err);
    }
};