import './App.scss';
import AlbumsOverview from './AlbumsOverview';
import { Fragment, useState } from 'react';
import AlbumOverview from './AlbumOverview';
import AlbumCarousel from './AlbumCarousel';
import { ACTIONS, AppStateContext, useAppStateReducer } from './context/appState';

export default () => {
  const [state, dispatch] = useAppStateReducer();
  const [carouselConfig, setCarouselConfig] = useState(null);

  return (
    [
      <Fragment>
        <div className={`app ${carouselConfig != null ? "carousel-opened" : ""}`}>
          <AppStateContext.Provider value={{state, dispatch}}>
            {state.currentAlbum && carouselConfig && (
              <div className="retour" onClick={() => {
                if (carouselConfig != null) {
                  setCarouselConfig(null);
                } else {
                  dispatch({ type: ACTIONS.SELECT_ALBUM, album: null })
                }
              }}>
                {"< Retour"}
              </div>
            )}
            <div className="app-simple-header">
                <div className="header-links">
                  {/*<div className={`${!checkingAlbums ? 'selected' : ''}`} onClick={() => setCheckingAlbums(false)}>Accueil</div>*/}
                  <div className={`${!state.currentAlbum ? 'selected' : ''}`} onClick={() => dispatch({ type: ACTIONS.SELECT_ALBUM, album: null})}>Albums</div>
                  {state.currentAlbum && <div className="selected">{state.currentAlbum .name}</div>}
                </div>
            </div>
            {!state.currentAlbum && <AlbumsOverview />}
            {state.currentAlbum && <AlbumOverview onPictureChosen={(config) => setCarouselConfig(config)} />}
          </AppStateContext.Provider>
        </div>
      </Fragment>,
      <Fragment>
        {carouselConfig && <AlbumCarousel pictures={carouselConfig.pictures} initialSlide={carouselConfig.initialSlide} />}
      </Fragment>
    ]
  );
};