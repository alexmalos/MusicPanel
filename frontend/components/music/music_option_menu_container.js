import { connect } from 'react-redux';
import MusicOptionMenu from './music_option_menu';
import { fetchUser } from '../../actions/user_actions';
import { openModal, closeModal, closeModalConfirm } from '../../actions/modal_actions';
import { createListItems } from '../../actions/list_actions';

const mapStateToProps = ({ session, ui }) => ({
    sessionId: session.id,
    modalType: ui.modal.modalType
});

const mapDispatchToProps = dispatch => ({
    openModal: (modal, data) => dispatch(openModal(modal, data)),
    closeModal: () => dispatch(closeModal()),
    fetchUser: id => dispatch(fetchUser(id)),
    createListItems: data => dispatch(createListItems(data)),
    closeModalConfirm: modalConfirm => dispatch(closeModalConfirm(modalConfirm))
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicOptionMenu);
