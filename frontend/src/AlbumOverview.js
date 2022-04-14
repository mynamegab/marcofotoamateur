import './AlbumOverview.scss';

import { useEffect, useState } from "react";

import { getPictures } from "./api/albums";
import PicturePanel from './PicturePanel';
import { useAppState } from './context/appState';

export default ({ onPictureChosen }) => {
    const context = useAppState();
    const currentAlbum = context.state.currentAlbum;
    const [pictures, setPictures] = useState([]);

    useEffect(() => {
        getPictures(currentAlbum.id)
            .then(setPictures);
    }, [currentAlbum.id]);

    return (
        <div className="album-overview">
            <div className='album-pictures-container'>
                {pictures.map((picture, i) => <PicturePanel key={i} picture={picture} onClick={() => onPictureChosen({ pictures, initialSlide: i})} />)}
            </div>
        </div>
    );
};