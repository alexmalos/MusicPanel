import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../actions/session_actions';
import SessionForm from './session_form';
import { openModal } from '../../actions/modal_actions';

const mapStateToProps = ({ errors }) => ({
    errors: errors.session,
    submitText: 'Log In',
    navLink: <Link to="/signup">sign up instead</Link>,
});

const mapDispatchToProps = dispatch => ({
    processForm: user => dispatch(login(user)),
    openModal: modal => dispatch(openModal(modal))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
