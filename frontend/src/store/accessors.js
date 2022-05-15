export const getPictures = (albumId, state) => state.albums[albumId]
    ? state.albums[albumId].pictures
    : null;

export const hasPictures = (albumId, state) => !!getPictures(albumId, state);

export const getAlbums = (state) => state.albums;
export const getAlbum = (state, albumId) => getAlbums(state)[albumId];