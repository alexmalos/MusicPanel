import {
    RECEIVE_LISTS,
    RECEIVE_LIST,
    REMOVE_LIST,
} from '../actions/list_actions';
import { RECEIVE_USER } from '../actions/user_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    const newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_LISTS:
        case RECEIVE_USER:
            return Object.assign({}, state, action.lists);
        case RECEIVE_LIST:
            newState[action.list.id] = action.list;
            return newState;
        case REMOVE_LIST:
            delete newState[action.listId];
            return newState;
        default:
            return state;
    }
};
