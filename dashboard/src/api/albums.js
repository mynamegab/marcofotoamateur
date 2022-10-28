import axios from 'axios';
import FormData from 'form-data';

export const getHomepage = async () => (
    axios.get(`${process.env.REACT_APP_DASHBOARD_BACKEND_URL}/homepage`)
        .then(response => response.data)
);

export const addPictureOfTheMoment = async (pictureId) => (
    axios.put(`${process.env.REACT_APP_DASHBOARD_BACKEND_URL}/homepage/pictures-of-the-moment/${pictureId}`)
        .then(response => response.data)
);

export const removePictureOfTheMoment = async (pictureId) => (
    axios.delete(`${process.env.REACT_APP_DASHBOARD_BACKEND_URL}/homepage/pictures-of-the-moment/${pictureId}`)
        .then(response => response.data)
);

export const createAlbum = async (name) => (
    axios.post(`${process.env.REACT_APP_DASHBOARD_BACKEND_URL}/albums`, { name })
        .then(response => response.data)
);

export const updateAlbum = async (albumId, data) => (
    axios.put(`${process.env.REACT_APP_DASHBOARD_BACKEND_URL}/albums/${albumId}`, data)
        .then(response => response.data)
);

export const createPicture = async (albumId, title, data) => {
    const formData = new FormData();
    formData.append("file", data);
    formData.append("title", title);

    return (
        axios.post(`${process.env.REACT_APP_DASHBOARD_BACKEND_URL}/albums/${albumId}/pictures`, formData, {
            headers: data.getHeaders ? data.getHeaders() : { 'Content-Type': 'multipart/form-data' }
        })
            .then(response => response.data)
    );
}

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