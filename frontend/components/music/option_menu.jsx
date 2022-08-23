import React from "react";

export default ({ loggedIn, openModal, musicType, spotify }) => (
    <div className='option-menu'>
        {
            loggedIn ?
                [
                    <button key={1} id='first-option'>Write Review</button>,
                    <button key={2}>Add to Listen Later</button>,
                    <button key={3}>Add {musicType} to a list</button>
                ] :
                <button onClick={() => openModal('login')}>Sign in for more options</button>
        }
        <a id="last-option" href={`https://open.spotify.com/${spotify}`} target='_blank'>
            Listen on Spotify
        </a>
    </div>
);
