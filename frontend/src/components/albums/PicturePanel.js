import './PicturePanel.scss';

import LazyLoadedImage from '../generic/LazyLoadedImage';

export default ({ picture, onClick }) => {
    return (
        <div className="album-picture-container" onClick={onClick}>
            <div className='picture-container'>
                <LazyLoadedImage src={`https://storage.googleapis.com/marcofotoamateur-gallery/thumbnails/${picture.assetId}.${picture.format}`} />
            </div>

            {picture.title && (
                <div className="title">
                    {picture.title}
                </div>
            )}
        </div>
    );
};