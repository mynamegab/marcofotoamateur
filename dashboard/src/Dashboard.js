import { useEffect, useMemo, useState } from 'react';
import { fetchAlbums, fetchPictures, updatePicture } from './api/albums';
import './Dashboard.scss';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import PictureEditor from './components/PictureEditor';

export default () => {
    const [albums, setAlbums] = useState([]);
    const [pictures, setPictures] = useState([]);
    const [albumId, setAlbumId] = useState(null);

    useEffect(() => {
        fetchAlbums().then(albums => {
            setAlbums(albums);
            setAlbumId(albums[0].id);
        });
    }, []);

    useEffect(() => {
        if (albumId) {
            fetchPictures(albumId).then(setPictures);
        }
    }, [albumId]);

    const options = useMemo(() => {
        const tempAlbumNames = albums.map((album) => ({ value: album.id, label: album.name }));
        tempAlbumNames.sort((a, b) => a.label.localeCompare(b.label));
        return tempAlbumNames;
    }, [albums]);

    const _updatePicture = async (pictureId, data) => {
        const updatedPicture = await updatePicture(albumId, pictureId, data);

        setPictures(pictures.map(picture => {
            if (picture._id === updatedPicture._id) {
                return updatedPicture;
            }

            return picture;
        }));
    };

    const renderPictures = (__pictures) => __pictures.map((picture) => (
        <PictureEditor
            key={picture._id}
            albumId={albumId}
            picture={picture}
            onUpdateRequested={(data) => _updatePicture(picture._id, data)}
        />
    ));

    return (
        <div className="dashboard">
            <div className="album-selector labeled-container container">
                <label>Albums:</label>
                <Dropdown options={options} onChange={(option) => setAlbumId(option.value)} value={options[0]} placeholder="Select an option" />
            </div>

            <div className="pictures-container">
                <h1>Visible</h1>
                {renderPictures(pictures.filter(picture => !picture.hidden))}
                <h1>Hidden</h1>
                {renderPictures(pictures.filter(picture => picture.hidden))}
            </div>
        </div>
    );
};