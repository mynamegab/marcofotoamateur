import React from 'react'

export const ACTIONS = {
    SELECT_ALBUM: "SELECT_ALBUM"
};

export const AppStateContext = React.createContext()

const appStateReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SELECT_ALBUM: {
            return {
                ...state,
                currentAlbum: action.album
            };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
};

export const useAppStateReducer = () => React.useReducer(appStateReducer, {
    currentAlbum: null
});

export const useAppState = () => React.useContext(AppStateContext);