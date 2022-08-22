import React, { useEffect } from 'react';
import LoginFormContainer from '../session_form/login_form_container';
import SignupFormContainer from '../session_form/signup_form_container';
import ArtistBioModal from '../artist/artist_bio_modal';
import CloseIcon from '@mui/icons-material/Close';
import EditReviewFormContainer from '../reviews/edit_review_form_container';
import NewReviewFormContainer from '../reviews/new_review_form_container';

export default props => {
    useEffect(() => {
        const handleClick = e => {
            const modalWindow = document.getElementsByClassName('modal-window')[0];
            if (e.target.id !== 'create-account-button' && modalWindow &&
                !modalWindow.contains(e.target)) props.closeModal();
        };

        document.addEventListener('click', handleClick);

        return () => document.removeEventListener('click', handleClick);
    });

    let component, headerText;
    let wideModal = false;
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
        case 'newReview':
            component = <NewReviewFormContainer
                            authorId={props.authorId}
                            itemId={props.itemId}
                            itemType={props.itemType}
                        />;
            headerText = 'Create Review';
            wideModal = true;
            break;
        case 'editReview':
            component = <EditReviewFormContainer />;
            headerText = 'Edit Review';
            wideModal = true;
            break;
        default:
            return null;
    }

    return (
        <div id="modal-overlay">
            <div id="modal-content">
                <div className="modal-window" id={wideModal ? 'wide-modal-window' : ''}>
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
