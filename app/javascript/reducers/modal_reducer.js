import {
    OPEN_MODAL,
    CLOSE_MODAL,
    CLOSE_MODAL_CONFIRM
} from '../actions/modal_actions';

const _nullModal = Object.freeze({
    modalType: null,
    data: false,
    modalConfirm: null
});

export default (state = _nullModal, { type, modalType, data, modalConfirm }) => {
    const newState = Object.assign({}, state);

    switch (type) {
        case OPEN_MODAL:
            document.body.classList.add('modal-open');
            return { modalType, data, modalConfirm };
        case CLOSE_MODAL:
            if (state.modalConfirm && !window.confirm(state.modalConfirm)) return state;
            else {
                document.body.classList.remove('modal-open');
                return _nullModal;
            }
        case CLOSE_MODAL_CONFIRM:
            newState.modalConfirm = modalConfirm;
            return newState;
        default:
            return state;
    }
};
