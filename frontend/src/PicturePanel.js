import LazyLoadedImage from './LazyLoadedImage';

export default ({ picture, onClick }) => {
    return (
        <div className="album-picture-container" onClick={onClick}>
            <div className='picture-container'>
                <LazyLoadedImage src={`https://storage.googleapis.com/marcofotoamateur-gallery/thumbnails/${picture.assetId}.${picture.format}`} />
            </div>
        </div>
    );
};