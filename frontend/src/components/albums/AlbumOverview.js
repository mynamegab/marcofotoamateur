import './AlbumOverview.scss';

import PicturePanel from './PicturePanel';
import { useNavigate, useParams } from 'react-router';
import { buildWatchAlbumPath } from '../../util/navigator.util';
import AlbumsSearchTrace from './AlbumsSearchTrace';
import useAlbum from '../../hooks/useAlbum';

export default () => {
    const { albumId } = useParams();
    const navigate = useNavigate();
    const album = useAlbum(albumId);
    const pictures = album?.pictures;

    const onPictureChosen = (picture) => {
        navigate(buildWatchAlbumPath(albumId, picture));
    };

    return (
        <div className="album-overview">
            {album && <AlbumsSearchTrace albumName={album.name} />}
            <div className='album-pictures-container'>
                {pictures && pictures.map((picture, i) => (
                    <PicturePanel
                        key={i}
                        picture={picture}
                        onClick={() => onPictureChosen(picture)}
                    />
                ))}
            </div>
        </div>
    );
};