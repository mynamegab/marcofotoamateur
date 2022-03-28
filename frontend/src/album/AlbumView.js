import './AlbumView.scss';
import PictureDisplay from './PictureDisplay';

export default () => {
  return (
    <div className="album-view">
      <header>
        <h3 className="title">Oiseaux du Quebec</h3>
      </header>

      <div className="content">
        <PictureDisplay />
      </div>

      <footer>
        Something else
      </footer>
    </div>
  );
};