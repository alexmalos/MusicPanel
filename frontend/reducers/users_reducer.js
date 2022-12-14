import { RECEIVE_LIST } from '../actions/list_actions';
import { RECEIVE_ALBUM, RECEIVE_ARTIST } from '../actions/music_actions';
import { RECEIVE_REVIEW, RECEIVE_REVIEWS } from '../actions/review_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_USER } from '../actions/user_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ARTIST:
    case RECEIVE_ALBUM:
    case RECEIVE_REVIEWS:
      return Object.assign({}, state, action.users);
    case RECEIVE_REVIEW:
    case RECEIVE_CURRENT_USER:
    case RECEIVE_LIST:
    case RECEIVE_USER:
      return Object.assign({}, state, { [action.user.id]: action.user });
    default:
      return state;
  }
};
