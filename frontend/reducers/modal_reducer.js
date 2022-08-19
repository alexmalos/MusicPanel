import {
    OPEN_MODAL,
    CLOSE_MODAL
} from '../actions/modal_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
  
export default (state = null, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            document.body.classList.add('modal-open');
            return action.modal;
        case CLOSE_MODAL:
        case RECEIVE_CURRENT_USER:
            document.body.classList.remove('modal-open');
            return null;
        default:
            return state;
    }
};
