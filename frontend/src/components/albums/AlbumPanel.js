import moment from 'moment';
import { useNavigate } from 'react-router';

import LazyLoadedImage from '../generic/LazyLoadedImage';

export default ({ album }) => {
    const nagivate = useNavigate();

    return (
        <div className="album-container" onClick={() => nagivate('./' + album.id)}>
            <div className='picture-container'>
                <LazyLoadedImage src={`https://storage.googleapis.com/marcofotoamateur-gallery/thumbnails/${album.thumbnail.assetId}.${album.thumbnail.format}`} />
                <div className="pictures-count">
                    <span className="material-icons-outlined">image</span>
                    {`${album.pictureCount} image${album.pictureCount === 1 ? '' : 's'}`}
                </div>
            </div>
            
            <h2>{album.name}</h2>
            <div className='album-details'>
                <span>{'Créé le ' + moment(album.creationTimestamp * 1000).format("D MMMM YYYY")}</span>
            </div>
        </div>
    );
};