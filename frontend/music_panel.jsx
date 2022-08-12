import React from "react";
import ReactDOM from "react-dom";
import { login, signup } from "./actions/session_actions";
import Root from "./components/root";
import configureStore from "./store/store";

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    const store = configureStore();
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    window.login = login;
    window.signup = signup;
    ReactDOM.render(<Root store={store}/>, root);
});