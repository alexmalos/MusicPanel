import React from "react";

export default ({ loggedIn, openLoginModal }) => (
    <div className='option-menu'>
        {
            loggedIn ?
                [
                    <button key={1}>Write Review</button>,
                    <button key={2}>Add to Listen Later</button>,
                    <button key={3}>Add album to a list</button>
                ] :
                <button onClick={openLoginModal}>Sign in for more options</button>
        }
        <a href='https://open.spotify.com/album/7D2NdGvBHIavgLhmcwhluK' target='_blank'>
            Listen on Spotify
        </a>
    </div>
);