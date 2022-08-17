import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import ReviewForm from './review_form';

const mapStateToProps = props => ({
    
});

const mapDispatchToProps = dispatch => ({
    processForm: user => dispatch(login(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
