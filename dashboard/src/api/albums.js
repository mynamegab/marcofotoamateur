import axios from 'axios';

export const fetchAlbums = async () => (
    axios.get(`${process.env.REACT_APP_DASHBOARD_BACKEND_URL}/albums`)
        .then(response => response.data)
);

export const fetchPictures = async (albumId) => (
    axios.get(`${process.env.REACT_APP_DASHBOARD_BACKEND_URL}/albums/${albumId}/pictures`)
        .then(response => response.data)
);

export const updatePicture = async (albumId, pictureId, data) => (
    axios.put(`${process.env.REACT_APP_DASHBOARD_BACKEND_URL}/albums/${albumId}/pictures/${pictureId}`, data)
        .then(response => response.data)
);