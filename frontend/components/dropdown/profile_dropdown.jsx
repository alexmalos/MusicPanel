import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';

export default props => {
    useEffect(() => {
        const handleClick = e => {
            const profileDropdown = document.getElementById('profileDropdown');
            if (!profileDropdown.contains(e.target)) props.closeDropdown();
        };

        document.addEventListener('click', handleClick);

        return () => document.removeEventListener('click', handleClick);
    });

    return (
        <div id="profileDropdown">
            <Link to='/' className='dropdownLink'>
                <div className='profileButtonDiv' id='dropdownProfileButton'>
                    <PersonIcon />
                </div>
                <div id='profileTextDiv'>
                    <h5>{props.currentUser.username}</h5>
                    <p>Go to my profile</p>
                </div>
            </Link>
            <div className='dropdownDivider'></div>
            <Link to='/' className='dropdownLink' onClick={props.logout}>
                <CancelIcon />
                <p>Log out</p>
            </Link>
        </div>
    );
};
