import React from "react";

export default ({ loggedIn, openModal, musicType, spotify }) => (
    <div className='option-menu'>
        {
            loggedIn ?
                [
                    <button key={1} className='first-option'>Add to Listen Later</button>,
                    <button key={2}>Add {musicType} to a list</button>
                ] :
                <button onClick={() => openModal('login')}>Sign in for more options</button>
        }
        <a className="last-option" href={`https://open.spotify.com/${spotify}`} target='_blank'>
            Listen on Spotify
        </a>
    </div>
);