import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { StoreProvider } from './store/store';
import { initialState, reducer } from './store/reducer';

ReactDOM.render(
    <StoreProvider initialState={initialState} reducer={reducer}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </StoreProvider>,
    document.getElementById('root')
);
