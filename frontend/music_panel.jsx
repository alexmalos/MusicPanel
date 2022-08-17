import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import configureStore from "./store/store";
import { fetchAlbum, fetchArtist, fetchSong } from "./actions/music_actions";

document.addEventListener('DOMContentLoaded', () => {
    let store;
    if (window.currentUser) {
        const preloadedState = {
          entities: {
            users: { [window.currentUser.id]: window.currentUser }
          },
          session: { id: window.currentUser.id }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }

    window.getState = store.getState;
    window.dispatch = store.dispatch;
    // window.fetchArtist = fetchArtist;
    // window.fetchAlbum = fetchAlbum;
    // window.fetchSong = fetchSong;
    
    const root = document.getElementById('root');
    ReactDOM.render(<Root store={store}/>, root);
});
