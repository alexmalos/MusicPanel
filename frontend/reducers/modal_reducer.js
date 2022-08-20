import {
    OPEN_MODAL,
    CLOSE_MODAL
} from '../actions/modal_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const _nullModal = Object.freeze({
    modalType: null,
    data: false
});

export default (state = _nullModal, { type, modalType, data }) => {
    switch (type) {
        case OPEN_MODAL:
            document.body.classList.add('modal-open');
            return { modalType, data };
        case CLOSE_MODAL:
        case RECEIVE_CURRENT_USER:
            document.body.classList.remove('modal-open');
            return _nullModal;
        default:
            return state;
    }
};
