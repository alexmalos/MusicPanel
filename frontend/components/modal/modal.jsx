import React from 'react';
import LoginFormContainer from '../session_form/login_form_container';
import SignupFormContainer from '../session_form/signup_form_container';

export default ({ modal, closeModal }) => {
    if (modal) {
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
            <div id="modalOverlay">
                <div id="modalContent">
                    <div id="modalWindow">
                        <div id="modalHeader">
                            <div id="leftPlaceholder"></div>
                                <p>{headerText}</p>
                            <div id="closeDiv" onClick={closeModal}>
                                <p id="closeIcon">×</p>
                            </div>
                        </div>
                        <div id="modalInnerContent">
                            {component}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
