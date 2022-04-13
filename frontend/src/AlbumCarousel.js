import "./AlbumCarousel.scss";

import React from 'react';

import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

export default ({ pictures, initialSlide}) => {
    const settings = {
      index: initialSlide,
      shouldLazyLoad: true,
      hasMediaButton: false,
      hasSizeButton: false,
      hasIndexBoard: false,
      transitionSpeed: 100,
      objectFit: 'contain'
    };

    const images = pictures.map((picture, i) => ({
        src: `https://storage.googleapis.com/marcofotoamateur-gallery/images/${picture.assetId}.${picture.format}`,
        thumbnail: `https://storage.googleapis.com/marcofotoamateur-gallery/thumbnails/${picture.assetId}.${picture.format}`
    }));

    return (
        <div className="slider-container">
            <Carousel {...settings} images={images} />
        </div>
    );
  }