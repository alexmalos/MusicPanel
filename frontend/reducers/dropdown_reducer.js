import {
    OPEN_DROPDOWN,
    CLOSE_DROPDOWN
} from '../actions/dropdown_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';
  
export default (state = null, action) => {
    switch (action.type) {
        case OPEN_DROPDOWN:
            return action.dropdown;
        case CLOSE_DROPDOWN:
        case LOGOUT_CURRENT_USER:
            return null;
        default:
            return state;
    }
};
