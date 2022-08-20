import React, { useState } from "react";
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

export default props => {
    const [state, setState] = useState({ username: '', password: '' });

    const handleSubmit = e => {
        e.preventDefault();
        const user = Object.assign({}, state);
        props.processForm(user);
    };

    const update = field => e => (
        setState(Object.assign({}, state, { [field]: e.target.value }))
    );

    const renderErrors = () => {
        if (props.errors.length > 0) {
            return (
                <div className="form-section" id="error-div">
                    <WarningRoundedIcon />
                    <ul>
                        {props.errors.map((error, i) => (
                            <li key={`error-${i}`}>
                                {error}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    };

    const loginDemo = e => {
        e.preventDefault();
        props.loginDemo();
    }

    const openSignupModal = e => {
        e.preventDefault();
        props.openModal('signup');
    };

    return (
        <div id="session-form-content">
            <form id="session-form" onSubmit={handleSubmit}>
                <div className="form-input-div">
                    <label className="form-text" htmlFor="username-input">Username</label>
                    <input
                        className="form-input"
                        id="username-input"
                        type="text"
                        value={state.username}
                        onChange={update('username')}
                    />
                </div>
                <div className="form-input-div form-section">
                    <label className="form-text" htmlFor="password-input">Password</label>
                    <input
                        className="form-input"
                        id="password-input"
                        type="password"
                        value={state.password}
                        onChange={update('password')}
                    />
                </div>
                {renderErrors()}
                <button className="submit" type="submit">{props.submitText}</button>
                <button className="submit" id="demo-submit" onClick={loginDemo}>Demo User</button>
                {
                    props.openModal ?
                        <button onClick={openSignupModal} id='create-account-button'>
                            Create an account
                        </button> : null
                }
            </form>
        </div>
    );
};
