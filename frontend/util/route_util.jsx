import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={props => (
    loggedIn ? (
        <Redirect to="/reviews" />
    ) : (
        <Component {...props} />
    )
  )} />
);

const mapStateToProps = state => ({
    loggedIn: Boolean(state.session.id)
});

export const AuthRoute = connect(mapStateToProps)(Auth);
