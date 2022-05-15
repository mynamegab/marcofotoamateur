export const STORE_ALBUMS = 'APP/STORE_ALBUMS';
export const STORE_ALBUM_PICTURES = 'APP/STORE_ALBUM_PICTURES';

export const initialState = {

};

export const storeAlbums = (albums) => ({ type: STORE_ALBUMS, albums });
export const storePictures = (albumId, pictures) => ({ type: STORE_ALBUM_PICTURES, albumId, pictures });

export const reducer = (state = initialState, action) => {
    if (action.type === STORE_ALBUMS) {
        const albums = action.albums.reduce((curr, next) => {
            curr[next.id] = next;
            return curr;
        }, {});

        return {
            ...state,
            albums
        };
    }

    if (action.type === STORE_ALBUM_PICTURES) {
        const album = state.albums[action.albumId] || {};
        album.pictures = action.pictures;

        return {
            ...state,
            albums: { ...state.albums, [action.albumId]: album }
        };
    }

    return state;
};