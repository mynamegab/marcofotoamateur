import './AlbumOverview.scss';

import { useEffect, useState } from "react";

import { getPictures } from "./api/albums";

export default ({album, onPictureChosen}) => {
    const [pictures, setPictures] = useState([]);
    useEffect(() => {
        getPictures(album.id).then(setPictures);
    }, []);

    return (
        <div className="album-overview">
            <h1>{album.name}</h1>
            <div className='album-pictures-container'>
                {pictures.map((picture, i) => (
                    <div className="album-picture-container" onClick={() => onPictureChosen({ pictures, initialSlide: i})} >
                        <div className='picture-container'>
                            <img className="picture" src={`https://storage.googleapis.com/marcofotoamateur-gallery/thumbnails/${picture.assetId}.${picture.format}`}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};