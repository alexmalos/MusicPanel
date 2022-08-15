import React from 'react';

export default ({ openModal }) => (
    <div id='splashDiv'>
        <div id='background'></div>
        <div id='splashContent'>
            <div id='splashText'>
                <h1>Share Your Love for <span>Music<span/></span>  With Friends.</h1>
                <p>MusicPanel is a social platform that allows you to keep track of all the music you listen to and grow your passion for music with friends. Write reviews, rate albums, and compile lists in music's slowest growing community.</p>
                <div>
                    <button onClick={() => openModal('signup')}>Create Account</button>
                    <div>
                        <p>GitHub</p>
                        <p>LinkedIn</p>
                    </div>
                </div>
            </div>
            <div id='videoDiv'></div>
        </div>
    </div>
);
