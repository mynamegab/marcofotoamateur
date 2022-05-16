import { useEffect, useMemo, useState } from 'react';
import { fetchAlbums, fetchPictures, updatePicture } from './api/albums';
import './Dashboard.scss';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

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

    const renderPictures = (__pictures) => __pictures.map((picture, i) => (
        <div key={i} className="picture-container">
            <div className="picture-thumbnail">
                <img src={`https://storage.googleapis.com/marcofotoamateur-gallery/thumbnails/${picture.assetId}.${picture.format}`} />
            </div>
            <button
                onClick={async () => {
                    await updatePicture(albumId, picture.id, {
                        hidden: !picture.hidden
                    });
                    // todo
                    await fetchPictures(albumId).then(setPictures);
                }}
            >
                {picture.hidden ? "SHOW" : "HIDE"}
            </button>
        </div>
    ));

    return (
        <div className="dashboard">
            <Dropdown options={options} onChange={(option) => setAlbumId(option.value)} value={options[0]} placeholder="Select an option" />

            <div className="pictures-container">
                <h1>Visible</h1>
                {renderPictures(pictures.filter(picture => !picture.hidden))}
                <h1>Hidden</h1>
                {renderPictures(pictures.filter(picture => picture.hidden))}
            </div>
        </div>
    );
};