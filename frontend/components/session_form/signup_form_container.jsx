import { connect } from 'react-redux';
import { signup, login } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = ({ errors }) => ({
    errors: errors.session,
    submitText: 'Create Account'
});

const mapDispatchToProps = dispatch => ({
    processForm: user => dispatch(signup(user)),
    loginDemo: () => dispatch(login({ username: 'demo', password: 'password' }))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
