import React, { useEffect } from 'react';
import LoginFormContainer from '../session_form/login_form_container';
import SignupFormContainer from '../session_form/signup_form_container';
import CloseIcon from '@mui/icons-material/Close';

export default ({ modal, closeModal }) => {
    useEffect(() => {
        const handleClick = e => {
            const modalWindow = document.getElementById('modal-window');
            if (e.target.id !== 'create-account-button' && modalWindow &&
                !modalWindow.contains(e.target))  closeModal();
        };

        document.addEventListener('click', handleClick);

        return () => document.removeEventListener('click', handleClick);
    });

    let component, headerText;
    switch (modal) {
        case 'login':
            component = <LoginFormContainer />;
            headerText = "Log In to MusicPanel";
            break;
        case 'signup':
            component = <SignupFormContainer />;
            headerText = "Join MusicPanel";
            break;
        default:
            return null;
    }

    return (
        <div id="modal-overlay">
            <div id="modal-content">
                <div id="modal-window">
                    <div id="modal-header">
                        <div id="left-placeholder"></div>
                            <h5>{headerText}</h5>
                        <button id="close-button" onClick={closeModal}>
                            <CloseIcon/>
                        </button>
                    </div>
                    <div id="modal-inner-content">
                        {component}
                    </div>
                </div>
            </div>
        </div>
    );
};
