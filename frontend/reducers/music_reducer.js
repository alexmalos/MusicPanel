import { RECEIVE_ARTIST, RECEIVE_ALBUM, RECEIVE_SONG } from "../actions/music_actions";

export const artists = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ARTIST:
    case RECEIVE_ALBUM:
      return Object.assign({}, state, { [action.artist.id]: action.artist });
    default:
      return state;
  }
};

export const albums = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
      case RECEIVE_ARTIST:
        const albums = action.albums.reduce((acc, album) => (acc[album.id] = album, acc), {});
        return Object.assign({}, state, albums);
      case RECEIVE_ALBUM:
        return Object.assign({}, state, { [action.album.id]: action.album });
      default:
        return state;
    }
};

export const songs = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
      case RECEIVE_ALBUM:
        const songs = action.tracks.reduce((acc, song) => (acc[song.id] = song, acc), {});
        return Object.assign({}, state, songs);
      default:
        return state;
    }
};
