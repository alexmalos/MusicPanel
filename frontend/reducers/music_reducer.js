import { RECEIVE_ARTIST, RECEIVE_ALBUM, RECEIVE_SONG, RECEIVE_TRACKS } from "../actions/music_actions";

export const artists = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ARTIST:
      return Object.assign({}, state, { [action.artist.id]: action.artist });
    default:
      return state;
  }
};

export const albums = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
      case RECEIVE_ALBUM:
        return Object.assign({}, state, { [action.album.id]: action.album });
      default:
        return state;
    }
};

export const songs = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
      case RECEIVE_TRACKS:
        const songs = action.tracks.reduce((acc, song) => (acc[song.id] = song, acc), {});
        return Object.assign({}, state, songs);
      case RECEIVE_SONG:
        return Object.assign({}, state, { [action.song.id]: action.song });
      default:
        return state;
    }
};
