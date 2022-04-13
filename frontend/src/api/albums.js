import axios from 'axios';

export const getAlbums = async () => (
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/albums`)
        .then(response => response.data)
);

export const getPictures = async (albumId) => (
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/albums/${albumId}/pictures`)
        .then(response => response.data)
);