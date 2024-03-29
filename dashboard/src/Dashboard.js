import { useEffect, useMemo, useState } from 'react';
import { createAlbum, createPicture, fetchAlbums, getHomepage, updateAlbum, updatePicture } from './api/albums';
import './Dashboard.scss';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import PictureEditor from './components/PictureEditor';
import { FileUploaderContainer } from './components/FileUploaderContainer';

export default () => {
    const [homepage, setHomepage] = useState({ picturesOfTheMoment: [] })
    const [albums, setAlbums] = useState({});
    const [albumId, setAlbumId] = useState(null);
    const [currentAlbumName, setCurrentAlbumName] = useState("");
    const [newAlbumName, setNewAlbumName] = useState("");
    const [uploading, setUploading] = useState(false);
    const [uploadLog, setUploadLog] = useState([]);

    const album = ((albums || {})[albumId] || {});

    const refreshAlbums = async () => {
        const _albums = await fetchAlbums()
        setAlbums(_albums.reduce((prev, curr) => {
            prev[curr._id] = curr;
            return prev;
        }, {}));

        return _albums;
    };

    useEffect(async () => {
        const _homepage = await getHomepage();
        setHomepage(_homepage);
    }, []);

    useEffect(async () => {
        const _albums = await refreshAlbums();
        setAlbumId(_albums[0]._id);
    }, []);

    useEffect(() => {
        setCurrentAlbumName(album.name);
    }, [albumId]);

    const options = useMemo(() => {
        const tempAlbumNames = Object.values(albums).map((album) => ({ value: album._id, label: album.name }));
        tempAlbumNames.sort((a, b) => a.label.localeCompare(b.label));
        return tempAlbumNames;
    }, [albums]);

    const pictures = album.pictures || [];

    const _updatePicture = async (pictureId, data) => {
        const updatedPicture = await updatePicture(albumId, pictureId, data);

        pictures.forEach((picture, i) => {
            if (picture._id === updatedPicture._id) {
                pictures[i] = updatedPicture;
                return;
            }
        });

        setAlbums({ ...albums });
    };

    const _updatePicturesOfTheMoment = async (updatedList) => {
        const _homepage = { ...homepage, picturesOfTheMoment: updatedList };
        setHomepage(_homepage);
    };

    const _updateAlbum = async (albumId, data) =>  {
        const updatedAlbum = await updateAlbum(albumId, data);
        updateCachedAlbum(updatedAlbum);
    };

    const renderPictures = (__pictures) => __pictures.map((picture) => (
        <PictureEditor
            key={picture._id}
            albumId={albumId}
            picture={picture}
            homepage={homepage}
            onUpdateRequested={(data) => _updatePicture(picture._id, data)}
            updatePicturesOfTheMoment={_updatePicturesOfTheMoment}
        />
    ));

    const updateCachedAlbum = (_album) => setAlbums({ ...albums, [_album._id]: _album });

    const uploadPictures = async (picturesToUpload) => {
        setUploading(true);
        
        for (const currFile of picturesToUpload) {
            const name = currFile.name;
            console.log('Uploading '+ name);

            setUploadLog([ ...uploadLog ].concat([ 'Uploading ' + name]));
            const picture = await createPicture(albumId, name, currFile);

            album.pictures.push(picture);
        }

        console.log(`Done uploading ${picturesToUpload.length} files`);

        updateCachedAlbum(album);
        setUploading(false);
        setUploadLog([]);
    };

    return (
        <>
            {uploading && (
                <div>
                    {
                        uploadLog.map((log, i) => <div key={i}>{log}</div>)
                    }
                </div>
            )}

            {!uploading && (
                <div className="dashboard">
                    <div className="container">
                        <h3>Homepage</h3>
                        
                        <div>{`There are currently ${homepage.picturesOfTheMoment.length} pictures of the day`}</div>
                    </div>

                    <div className="container">
                        <h3>Albums</h3>
                        <Dropdown
                            options={options}
                            onChange={(option) => setAlbumId(option.value)}
                            value={{ value: albumId, label: album.name }}
                            placeholder="Select an option"
                        />

                        <br />
                        <h4>Create album</h4>
                        <input
                            value={newAlbumName}
                            onChange={(event) => setNewAlbumName(event.target.value)}
                        />
                        <button disabled={!newAlbumName} onClick={async () => {
                            setNewAlbumName("");
                            const newAlbum = await createAlbum(newAlbumName);
                            updateCachedAlbum(newAlbum);
                            setAlbumId(newAlbum._id)
                        }}>Create</button>
                    </div>
                    
                    {albumId && (
                        <div>
                            <div className="container">
                                <h4>Selected album</h4>
                                <div className="album-name-container">
                                    <input
                                        value={currentAlbumName || ""}
                                        onChange={(event) => setCurrentAlbumName(event.target.value)}
                                    />
                                    <button disabled={currentAlbumName === album.name} onClick={async () => {
                                        _updateAlbum(albumId, { name: currentAlbumName })
                                    }}>Update name</button>
                                </div>
                                <div>albumId={albumId}</div>
                                <div>{pictures?.length} pictures</div>
                                <div>Currently {album.hidden ? 'hidden' : 'visible'}</div>
                                <button
                                    onClick={async () => {
                                        _updateAlbum(albumId, { hidden: !album.hidden });
                                    }}
                                >
                                    Toggle to {album.hidden ? 'visible' : 'hidden'}
                                </button>

                                <br />
                                <br />
                                <FileUploaderContainer albumId={albumId} uploadPicturesCallback={uploadPictures}/>
                                <br />

                                <div className="pictures-container">
                                    <h4>Visible pictures</h4>
                                    {renderPictures(pictures.filter(picture => !picture.hidden))}
                                    <h4>Hidden pictures</h4>
                                    {renderPictures(pictures.filter(picture => picture.hidden))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};