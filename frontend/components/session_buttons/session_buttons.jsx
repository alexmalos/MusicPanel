import React from 'react';

export default ({ currentUser, logout, openModal }) => {
    const loggedOut = () => (
        <div id='sessionButtons' className='lastItem'>
            <button id='login' onClick={() => openModal('login')}>Log In</button>
            <button id='signup' onClick={() => openModal('signup')}>Sign Up</button>
        </div>
    );

    const loggedIn = () => (
        <div className='lastItem'>
            <h1>Hello {currentUser.username} </h1>
            <button onClick={logout}>Logout</button>
        </div>
    );

    return currentUser ? loggedIn() : loggedOut();
};
