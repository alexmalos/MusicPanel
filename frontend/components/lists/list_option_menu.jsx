import React from "react";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default ({ sessionId, openModal, user, listId }) => (
    <div>
        {
            sessionId ? null :
                <p className="signup-message">
                    <Link to={`/users/${user.id}`}>{user.username[0].toUpperCase() + user.username.slice(1)}</Link> is using MusicPanel to keep track of all the music they listen to and to share their passion for music with friends.
                    <br />
                    <br />
                    <button onClick={() => openModal('signup')}>Create an account</button> to curate lists of your own.
                </p>
        }
        <div className='option-menu'>
            {/* <button key={1} className='first-option'>Like list</button>,
            <button key={2} className={sessionId === user.id ? 'last-option' : null}>0 likes</button> */}
            {sessionId === user.id ? <Link to={`/lists/${listId}/edit`} className='first-option last-option'>Edit or delete list</Link> : null}
        </div>
    </div>
);
