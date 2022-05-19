import albumService from "../../services/albums.service.js";

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
    thumbnail: pictures[0]
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