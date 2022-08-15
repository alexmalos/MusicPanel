import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';
import SessionForm from './session_form';

const mapStateToProps = ({ errors }) => ({
    errors: errors.session,
    submitText: 'Log In'
});

const mapDispatchToProps = dispatch => ({
    processForm: user => dispatch(login(user)),
    openModal: modal => dispatch(openModal(modal)),
    loginDemo: () => dispatch(login({ username: 'Demo User', password: 'password' }))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
