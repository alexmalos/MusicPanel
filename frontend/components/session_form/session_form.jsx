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

    return (
        <form onSubmit={handleSubmit}>
            {props.formType}
            {renderErrors()}
            <label>Username:
              <input type="text"
                value={state.username}
                onChange={update('username')}
              />
            </label>
            <br/>
            <label>Password:
              <input type="password"
                value={state.password}
                onChange={update('password')}
              />
            </label>
            <input type="submit" value={props.formType} />
        </form>
    )
};

export default SessionForm;