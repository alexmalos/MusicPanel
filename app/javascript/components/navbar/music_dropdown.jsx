import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default ({ closeDropdown }) => {
    useEffect(() => {
        const handleClick = e => {
            const musicDropdown = document.getElementById('music-dropdown');
            if (musicDropdown && e.target.id !== 'music-dropdown-button') closeDropdown();
        };

        document.addEventListener('click', handleClick);

        return () => document.removeEventListener('click', handleClick);
    });

    return (
        <div id="music-dropdown">
            <Link to='/albums' className='dropdown-link' onClick={closeDropdown}>Albums</Link>
            <Link to='/artists' className='dropdown-link' onClick={closeDropdown}>Artists</Link>
            <Link to='/tracks' className='dropdown-link' onClick={closeDropdown}>Tracks</Link>
        </div>
    );
};
