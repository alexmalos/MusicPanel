import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ currentUser, logout }) => {
    const sessionLinks = () => (
        <div>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
        </div>
    );

    const welcome = () => (
        <div>
            <h1>Hello {currentUser.username} </h1>
            <button onClick={logout}>Logout</button>
        </div>
    );

    return currentUser ? welcome() : sessionLinks();
};

export default Navbar;