import React, { useState } from "react";

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

    return (
        <form id="review-form" onSubmit={handleSubmit}>
            
        </form>
    );
};
