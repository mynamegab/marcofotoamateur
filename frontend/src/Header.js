import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import useOnClickOutside from "./hooks/useOnClickOutside";

export default () => {
    const ref = useRef();
    const [showingMenu, setShowingMenu] = useState(false);
    useOnClickOutside(ref, () => {
        if (showingMenu) {
            setShowingMenu(false);
        }
    });

    return (
        <header className="app-simple-header">
            <div className="logo-container">
                <img src="https://storage.googleapis.com/marcofotoamateur-gallery/public/logo.png" />
            </div>
            <div className={`header-links ${showingMenu ? 'visible' : ''}`} ref={ref}>
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
                <span className="material-symbols-outlined" style={{fontSize: '36px'}}>
                    menu
                </span>
            </div>
        </header>
    );
};