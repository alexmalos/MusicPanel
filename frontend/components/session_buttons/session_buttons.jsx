import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import ProfileDropdownContainer from '../dropdown/profile_dropdown_container';

export default props => {
    const loggedOut = () => (
        <div id='sessionButtons' className='lastItem'>
            <button id='login' onClick={() => props.openModal('login')}>Log In</button>
            <button id='signup' onClick={() => props.openModal('signup')}>Sign Up</button>
        </div>
    );

    const profileClick = () => {
        if (!props.dropdown) props.openDropdown('profile');
    };

    const renderDropdown = () => {
        if (props.dropdown === 'profile') return <ProfileDropdownContainer />
        else return null;
    };

    const loggedIn = () => (
        <div className='lastItem'>
            <div id='profileDiv'>
                <div className='profileButtonDiv' id='navbarProfileButton' onClick={profileClick}>
                    <PersonIcon />
                </div>
                {renderDropdown()}
            </div>
        </div>
    );

    return props.currentUser ? loggedIn() : loggedOut();
};
