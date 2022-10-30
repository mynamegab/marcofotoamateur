import './App.scss';
import {
  BrowserRouter,
  Routes ,
  Route,
  NavLink
} from "react-router-dom";

import AlbumCarousel from './components/albums/AlbumCarousel';
import AlbumsOverview from './components/albums/AlbumsOverview';
import AlbumOverview from './components/albums/AlbumOverview';
import Home from './components/home/Home';
import { useState } from 'react';

export default () => {
    const [showingMenu, setShowingMenu] = useState(false);
    return (
        <BrowserRouter >
            <div className="app">
                <div className="app-simple-header">
                    <div className="logo-container">
                        <img src="https://storage.googleapis.com/marcofotoamateur-gallery/public/logo.png" />
                    </div>
                    <div className={`header-links ${showingMenu ? 'visible' : ''}`}>
                        <ul>
                            <li onClick={() => setShowingMenu(false)}>
                                <NavLink to="/">
                                    <span className="material-icons-outlined">home</span>
                                    Accueil
                                </NavLink>
                            </li>
                            <li onClick={() => setShowingMenu(false)}>
                                <NavLink to="/albums">
                                    <span className="material-icons-outlined">photo_library</span>
                                    Albums
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className='mobile-menu-container' onClick={() => setShowingMenu(true)}>
                        <span className="material-symbols-outlined" style={{fontSize: '48px'}}>
                            menu
                        </span>
                    </div>
                </div>

                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/albums" element={<AlbumsOverview />} />
                    <Route exact path="/albums/:albumId" element={<AlbumOverview />} />
                    <Route exact path="/albums/:albumId/watch" element={<AlbumCarousel />} />
                </Routes>
            </div>
        </BrowserRouter >
    );
};