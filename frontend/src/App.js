import './App.scss';
import {
  BrowserRouter,
  Routes ,
  Route,
} from "react-router-dom";

import AlbumCarousel from './components/albums/AlbumCarousel';
import AlbumsOverview from './components/albums/AlbumsOverview';
import AlbumOverview from './components/albums/AlbumOverview';
import Home from './components/home/Home';
import Header from './Header';

export default () => {
    return (
        <BrowserRouter >
            <div className="app">
                <Header />

                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/albums" element={<AlbumsOverview />} />
                    <Route exact path="/albums/:albumId" element={<AlbumOverview />} />
                    <Route exact path="/albums/:albumId/watch" element={<AlbumCarousel />} />
                </Routes>

                <footer>
                    <div>Pour tout commentaire ou information, contactez marcofotoamateur@outlook.com</div>
                    <div className='copyright'>Copyright ©2022 marcofotoamateur.ca. Tous droits réservés</div>
                </footer>
            </div>
        </BrowserRouter >
    );
};