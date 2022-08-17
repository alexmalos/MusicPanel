import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import ProfileDropdownContainer from '../dropdown/profile_dropdown_container';

export default props => {
    const loggedOut = () => (
        <div id='session-buttons'>
            <button id='login' onClick={() => props.openModal('login')}>Log In</button>
            <button id='signup' onClick={() => props.openModal('signup')}>Sign Up</button>
        </div>
    );

    const profileClick = () => {
        if (!props.dropdown) props.openDropdown('profile');
    };

    const loggedIn = () => (
        <div id='profile-div'>
            <button className='profile-button' id='navbar-profile-button' onClick={profileClick}>
                <PersonIcon />
            </button>
            {props.dropdown === 'profile' ? <ProfileDropdownContainer /> : null}
        </div>
    );

    return props.currentUser ? loggedIn() : loggedOut();
};
