import React, { useEffect } from 'react';
import LoginFormContainer from '../session_form/login_form_container';
import SignupFormContainer from '../session_form/signup_form_container';
import ArtistBioModal from '../artist/artist_bio_modal';
import CloseIcon from '@mui/icons-material/Close';

export default props => {
    useEffect(() => {
        const handleClick = e => {
            const modalWindow = document.getElementById('modal-window');
            if (e.target.id !== 'create-account-button' && modalWindow &&
                !modalWindow.contains(e.target)) props.closeModal();
        };

        document.addEventListener('click', handleClick);

        return () => document.removeEventListener('click', handleClick);
    });

    let component, headerText;
    switch (props.modalType) {
        case 'login':
            component = <LoginFormContainer />;
            headerText = "Log In to MusicPanel";
            break;
        case 'signup':
            component = <SignupFormContainer />;
            headerText = "Join MusicPanel";
            break;
        case 'artistBio':
            component = <ArtistBioModal
                            artistBio={props.artistBio}
                            artistWikiPath={props.artistWikiPath}
                        />;
            headerText = props.artistName;
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
                        <button id="close-button" onClick={props.closeModal}>
                            <CloseIcon/>
                        </button>
                    </div>
                    {component}
                </div>
            </div>
        </div>
    );
};
