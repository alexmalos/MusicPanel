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

    let createAccount;
    if (props.openModal) createAccount = (
        <div id="create-account-div">
            <p onClick={() => props.openModal('signup')}>Create an account</p>
        </div>
    );
    else createAccount = null;

    return (
        <form id="session-form" onSubmit={handleSubmit}>
            <div className="form-input-div">
                <p className="form-text">Username</p>
                <input className="form-input"
                    type="text"
                    value={state.username}
                    onChange={update('username')}
                />
            </div>
            <div className="form-input-div form-section">
                <p className="form-text">Password</p>
                <input className="form-input"
                    type="password"
                    value={state.password}
                    onChange={update('password')}
                />
            </div>
            {renderErrors()}
            <button className="submit" type="submit">{props.submitText}</button>
            <button className="submit" id="demo-submit" onClick={loginDemo}>Demo User</button>
            {createAccount}
        </form>
    );
};
