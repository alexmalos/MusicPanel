import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import SubjectIcon from '@mui/icons-material/Subject';
import ListIcon from '@mui/icons-material/List';

export default props => {
    const { currentUser, closeDropdown } = props;

    useEffect(() => {
        const handleClick = e => {
            const profileDropdown = document.getElementById('profile-dropdown');
            if (profileDropdown && !profileDropdown.contains(e.target)) props.closeDropdown();
        };

        document.addEventListener('click', handleClick);

        return () => document.removeEventListener('click', handleClick);
    });

    return (
        <div id="profile-dropdown">
            <Link to={`/users/${currentUser.id}`} className='dropdown-element' onClick={closeDropdown}>
                <div className='profile-button' id='dropdown-profile-button'>
                    <PersonIcon />
                </div>
                <div id='profile-text-div'>
                    <h5>{props.currentUser.username}</h5>
                    <p>Go to my profile</p>
                </div>
            </Link>
            <div className='dropdown-divider'></div>
            <Link to={`/users/${currentUser.id}/reviews`} className='dropdown-element dropdown-link' onClick={closeDropdown}>
                <SubjectIcon />
                <p>Reviews</p>
            </Link>
            <Link to={`/users/${currentUser.id}/lists`} className='dropdown-element dropdown-link' onClick={closeDropdown}>
                <ListIcon />
                <p>Lists</p>
            </Link>
            <div className='dropdown-divider'></div>
            <button className='dropdown-element dropdown-button' onClick={props.logout}>
                <CancelIcon />
                <span>Log out</span>
            </button>
        </div>
    );
};
