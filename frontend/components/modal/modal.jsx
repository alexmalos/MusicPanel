import React, { useState, useEffect } from 'react';
import LoginFormContainer from '../session_form/login_form_container';
import SignupFormContainer from '../session_form/signup_form_container';
import ArtistBioModal from '../artist/artist_bio_modal';
import CloseIcon from '@mui/icons-material/Close';
import EditReviewFormContainer from '../reviews/edit_review_form_container';
import NewReviewFormContainer from '../reviews/new_review_form_container';

export default props => {
    useEffect(() => {
        const handleClick = e => {
            if (['modal-overlay', 'modal-content'].includes(e.target.id)) props.closeModal();
        };

        document.addEventListener('click', handleClick);

        return () => document.removeEventListener('click', handleClick);
    }, []);

    let headerText;
    let wideModal = false;
    let component = props.component;

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
            component = <EditReviewFormContainer
                            authorId={props.authorId}
                            itemId={props.itemId}
                            itemType={props.itemType}
                            review={props.review}
                            formType='editReview'
                        />;
            headerText = 'Edit Review';
            wideModal = true;
            break;
        case 'editRating':
            component = <EditReviewFormContainer
                            authorId={props.authorId}
                            itemId={props.itemId}
                            itemType={props.itemType}
                            review={props.review}
                            formType='editRating'
                        />;
            headerText = 'Edit Rating';
            wideModal = true;
            break;
        case 'deleteList':
            headerText = 'Delete List';
            break;
        case 'managePins':
            headerText = 'Manage Pins';
            break;
        case 'editProfile':
            headerText = 'Profile';
            break;
        case 'changePfp':
            headerText = 'Change Profile Picture';
            break;
        default:
            return null;
    }

    return (
        <div id="modal-overlay">
            <div id="modal-content">
                <div className="modal-window" id={wideModal ? 'wide-modal-window' : ''}>
                    {
                        props.modalType === 'addToList' || props.modalType === 'managePins' || props.modalType == 'editProfile' ?
                        <div id="modal-header">
                            <button id="close-button" onClick={props.closeModal}>
                                <CloseIcon/>
                            </button>
                            <h5>{props.headerText || headerText}</h5>
                            <div id='header-placeholder'>
                                <button id="save-button" disabled={props.saveDisabled} onClick={props.handleSave}>Save</button>
                            </div>
                        </div> :
                        <div id="modal-header">
                            <div id="header-placeholder"></div>
                            <h5>{headerText}</h5>
                            <button id="close-button" onClick={props.closeModal}>
                                <CloseIcon/>
                            </button>
                        </div>
                    }
                    {component}
                </div>
            </div>
        </div>
    );
};
