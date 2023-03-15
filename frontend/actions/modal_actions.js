export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const CLOSE_MODAL_CONFIRM = 'CLOSE_MODAL_CONFIRM';

export const openModal = (modalType, data = false) => ({
    type: OPEN_MODAL,
    modalType,
    data
});

export const closeModal = () => ({
    type: CLOSE_MODAL
});

export const closeModalConfirm = modalConfirm => ({
    type: CLOSE_MODAL_CONFIRM,
    modalConfirm
});
