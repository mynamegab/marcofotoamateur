import './App.scss';
import AlbumsOverview from './AlbumsOverview';
import { useState } from 'react';
import AlbumOverview from './AlbumOverview';
import AlbumCarousel from './AlbumCarousel';

export default () => {
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [carouselConfig, setCarouselConfig] = useState(null);

  return (
    <div className={`app ${carouselConfig != null ? "carousel-opened" : ""}`}>
      {currentAlbum && (
        <div className="retour" onClick={() => {
          if (carouselConfig != null) {
            setCarouselConfig(null);
          } else {
            setCurrentAlbum(null);
          }
        }}>
          {"< Retour"}
        </div>
      )}
      {!currentAlbum && <AlbumsOverview onAlbumChosen={setCurrentAlbum} />}
      {currentAlbum && <AlbumOverview album={currentAlbum} onPictureChosen={(config) => setCarouselConfig(config)} />}
      {carouselConfig && <AlbumCarousel pictures={carouselConfig.pictures} initialSlide={carouselConfig.initialSlide} />}
    </div>
  );
};