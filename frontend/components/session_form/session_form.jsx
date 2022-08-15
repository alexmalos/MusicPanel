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
                <div className="formSection" id="errorDiv">
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
        <div id="createAccountDiv">
            <p onClick={() => props.openModal('signup')}>Create an account</p>
        </div>
    );
    else createAccount = null;

    return (
        <form id="sessionForm" onSubmit={handleSubmit}>
            <div className="formInputDiv">
                <p className="formText">Username</p>
                <input className="formInput"
                    type="text"
                    value={state.username}
                    onChange={update('username')}
                />
            </div>
            <div className="formInputDiv formSection">
                <p className="formText">Password</p>
                <input className="formInput"
                    type="password"
                    value={state.password}
                    onChange={update('password')}
                />
            </div>
            {renderErrors()}
            <button className="submit" type="submit">{props.submitText}</button>
            <button className="submit" id="demoSubmit" onClick={loginDemo}>Demo User</button>
            {createAccount}
        </form>
    );
};
