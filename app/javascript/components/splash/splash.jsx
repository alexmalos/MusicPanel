import React from 'react';

export default ({ openModal }) => (
    <div id='splash-div'>
        <div id='background'></div>
        <div id='splash-content'>
            <div id='splash-text'>
                <h1>Share Your Love for <span>Music<span/></span>  With Friends.</h1>
                <p>MusicPanel is a social platform that allows you to keep track of all the music you listen to and grow your passion for music with friends. Write reviews, rate albums, and compile lists in music's slowest growing community.</p>
                <div>
                    <button onClick={() => openModal('signup')}>Create Account</button>
                    <div>
                        <a href='https://github.com/alexmalos/MusicPanel' target="_blank">GitHub</a>
                        <a href='https://www.linkedin.com/in/alexander-malos/' target="_blank">LinkedIn</a>
                        <a href='https://alexmalos.dev/' target="_blank">Portfolio</a>
                    </div>
                </div>
            </div>
            <div id='video-div'></div>
        </div>
    </div>
);
