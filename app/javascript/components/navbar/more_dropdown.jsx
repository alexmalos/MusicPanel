import React, { useEffect } from 'react';

export default ({ closeDropdown }) => {
    useEffect(() => {
        const handleClick = e => {
            const moreDropdown = document.getElementById('more-dropdown');
            const moreButton = document.getElementById("more-button");
            if (moreDropdown && !moreButton.contains(e.target)) closeDropdown();
        };

        document.addEventListener('click', handleClick);

        return () => document.removeEventListener('click', handleClick);
    });

    return (
        <div id="more-dropdown">
            <a className='dropdown-link' href='https://github.com/alexmalos/MusicPanel' target="_blank">GitHub</a>
            <a className='dropdown-link' href='https://www.linkedin.com/in/alexander-malos/' target="_blank">LinkedIn</a>
            <a className='dropdown-link' href='https://alexmalos.dev/' target="_blank">Portfolio</a>
        </div>
    );
};
