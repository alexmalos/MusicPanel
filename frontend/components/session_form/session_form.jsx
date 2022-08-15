import React, { useState } from "react";

const SessionForm = props => {
    const [state, setState] = useState({ username: '', password: '' });

    const handleSubmit = e => {
        e.preventDefault();
        const user = Object.assign({}, state);
        props.processForm(user);
    };

    const update = field => e => (
        setState(Object.assign({}, state, { [field]: e.target.value }))
    );

    const renderErrors = () => (
        <ul>
            {props.errors.map((error, i) => (
                <li key={`error-${i}`}>
                    {error}
                </li>
            ))}
        </ul>
    );

    let createAccount;
    if (props.openModal) createAccount = (
        <p id="createAccount" onClick={() => props.openModal('signup')}>Create an account</p>
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
            <button id="submit" type="submit">{props.submitText}</button>
            {/* <div id="submitDiv" onClick={handleSubmit}>
                <p>{props.submitText}</p>
            </div> */}
            {createAccount}
        </form>
    );
};

export default SessionForm;