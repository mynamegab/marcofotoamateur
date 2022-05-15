import './AlbumsSearchTrace.scss';
import { NavLink } from "react-router-dom";

export default ({
    albumName
}) => {
    return (
        <div className="albums-search-trace">
            <div><NavLink to="/albums">Albums</NavLink></div>
            {albumName && (
                <div>
                    <span className="material-icons-outlined">
                        chevron_right
                    </span>
                    <div>{albumName}</div>
                </div>
            )}
        </div>
    );
};
