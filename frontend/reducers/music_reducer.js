import { RECEIVE_ARTIST, RECEIVE_ALBUM } from "../actions/music_actions";
import { RECEIVE_REVIEW, RECEIVE_REVIEWS, REMOVE_REVIEW } from "../actions/review_actions";

export const artists = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_REVIEWS:
      return Object.assign({}, state, action.artists);
    case RECEIVE_ARTIST:
    case RECEIVE_ALBUM:
    case RECEIVE_REVIEW:
    case REMOVE_REVIEW:
      if (action.artist) {
        return Object.assign({}, state, { [action.artist.id]: action.artist });
      } else return state;
    default:
      return state;
  }
};

export const albums = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
      case RECEIVE_ARTIST:
      case RECEIVE_REVIEWS:
        return Object.assign({}, state, action.albums);
      case RECEIVE_ALBUM:
      case RECEIVE_REVIEW:
      case REMOVE_REVIEW:
        if (action.album) {
          return Object.assign({}, state, { [action.album.id]: action.album });
        } else return state;
      default:
        return state;
    }
};

export const tracks = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
      case RECEIVE_ALBUM:
      case RECEIVE_REVIEWS:
        return Object.assign({}, state, action.tracks);
      case RECEIVE_REVIEW:
      case REMOVE_REVIEW:
        if (action.track) {
          return Object.assign({}, state, { [action.track.id]: action.track });
        } else return state;
      default:
        return state;
    }
};
