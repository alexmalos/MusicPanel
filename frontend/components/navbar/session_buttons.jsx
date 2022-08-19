import React, { useState, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import ProfileDropdownContainer from './profile_dropdown_container';

export default props => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    useEffect(() => setDropdownOpen(false), [props.loggedIn]);

    const loggedOut = () => (
        <div id='session-buttons'>
            <button id='login' onClick={() => props.openModal('login')}>Log In</button>
            <button id='signup' onClick={() => props.openModal('signup')}>Sign Up</button>
        </div>
    );

    const profileClick = () => {
        if (!dropdownOpen) setDropdownOpen(true);
    };

    const loggedIn = () => (
        <div id='profile-div'>
            <button className='profile-button' id='navbar-profile-button' onClick={profileClick}>
                <PersonIcon />
            </button>
            {dropdownOpen ? <ProfileDropdownContainer
            closeDropdown={() => setDropdownOpen(false)}/> : null}
        </div>
    );

    return props.loggedIn ? loggedIn() : loggedOut();
};
