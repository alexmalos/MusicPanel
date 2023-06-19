import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';
import SessionButtons from './session_buttons';

const mapStateToProps = ({session, ui}) => ({
    loggedIn: Boolean(session.id),
    dropdown: ui.dropdown
});

const mapDispatchToProps = dispatch => ({
  openModal: modal => dispatch(openModal(modal))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionButtons);
