import moment from 'moment';
import { ACTIONS, useAppState } from './context/appState';
import LazyLoadedImage from './LazyLoadedImage';

export default ({ album }) => {
    const context = useAppState();

    return (
        <div className="album-container" onClick={() => context.dispatch({ type: ACTIONS.SELECT_ALBUM, album })}>
            <div className='picture-container'>
                <LazyLoadedImage src={`https://storage.googleapis.com/marcofotoamateur-gallery/thumbnails/${album.thumbnail.assetId}.${album.thumbnail.format}`} />
                <div className="pictures-count">
                    <span className="material-icons-outlined">image</span>
                    {album.pictureCount + ' Images'}
                </div>
            </div>
            
            <h2>{album.name}</h2>
            <div className='album-details'>
                <span>{'Créé le ' + moment(album.creationTimestamp * 1000).format("D MMMM YYYY")}</span>
            </div>
        </div>
    );
};