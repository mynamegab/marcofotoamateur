import 'react-gallery-carousel/dist/index.css';

import "./AlbumCarousel.scss";

import React, { useEffect, useMemo } from 'react';
import Carousel from 'react-gallery-carousel';
import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { buildAlbumOverviewPath, buildWatchAlbumPath } from '../../util/navigator.util';
import useAlbum from '../../hooks/useAlbum';

export default () => {
    const { albumId } = useParams();
    const album = useAlbum(albumId);
    const pictures = album?.pictures;

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const initialPictureAssetId = searchParams.get('picture');
    const initialIndex = useMemo(() => {
        if (!pictures || !initialPictureAssetId) {
            return null;
        }

        return pictures.findIndex(picture => picture.assetId === initialPictureAssetId);
    }, [initialPictureAssetId, pictures]);

    useEffect(() => {
        if (pictures && !initialPictureAssetId) {
            navigate(buildWatchAlbumPath(albumId, pictures[0]));
        }
    }, [pictures]);

    return (
        <div className="slider-container">
            <span 
                className="close-icon material-icons-outlined"
                onClick={() => navigate(buildAlbumOverviewPath(albumId))}
            >
                close
            </span>
            {
                pictures && (
                    <Carousel
                        {...{
                            index: initialIndex,
                            shouldLazyLoad: true,
                            hasMediaButton: false,
                            hasSizeButton: false,
                            hasIndexBoard: false,
                            transitionSpeed: 50,
                            objectFit: 'contain'
                        }}
                        images={pictures.map((picture) => ({
                            src: `https://storage.googleapis.com/marcofotoamateur-gallery/display/${picture.assetId}.${picture.format}`,
                            thumbnail: `https://storage.googleapis.com/marcofotoamateur-gallery/thumbnails/${picture.assetId}.${picture.format}`
                        }))}
                        onIndexChange={({ curIndex }) => {
                            navigate(`/albums/${albumId}/watch?picture=${pictures[curIndex].assetId}`);
                        }}
                    />
                )
            }
        </div>
    );
  }