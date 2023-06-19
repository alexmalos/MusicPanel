/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function OptionMenu ({ sessionId, openModal, user, itemId, itemType, renderModal, reviewType }) {
    const editOption = () => {
        if (itemType === 'list') return (
            <Link to={`/lists/${itemId}/edit`} className='first-option last-option'>
                Edit or delete list
            </Link>
        );
        else return (
            <button onClick={renderModal} className='first-option last-option'>
                Edit or delete {reviewType}
            </button>
        );
    };

    return (
        <div>
            {
                sessionId ? null :
                    <p className="signup-message">
                        <Link to={`/users/${user.id}`}>{user.username[0].toUpperCase() + user.username.slice(1)}</Link> is using MusicPanel to keep track of all the music they listen to and to share their passion for music with friends.
                        <br />
                        <br />
                        <button onClick={() => openModal('signup')}>Create an account</button> to {itemType === 'list' ? 'curate lists of your own' : 'write and share your own reviews'}.
                    </p>
            }
            <div className='option-menu'>
                {/* <button key={1} className='first-option'>
                    <FavoriteBorderIcon />
                    Like {itemType}
                </button>
                <button key={2} className={sessionId === user.id ? null : 'last-option'}>0 Likes</button> */}
                {sessionId === user.id ? editOption() : null}
            </div>
        </div>
    );
}
