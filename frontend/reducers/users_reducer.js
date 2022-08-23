import { RECEIVE_ALBUM, RECEIVE_ARTIST } from '../actions/music_actions';
import { RECEIVE_REVIEW } from '../actions/review_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ARTIST:
    case RECEIVE_ALBUM:
      return Object.assign({}, state, action.users)
    case RECEIVE_REVIEW:
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, { [action.user.id]: action.user });
    default:
      return state;
  }
};
