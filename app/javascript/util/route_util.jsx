import React from "react";
import { connect } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const Auth = ({ component: loggedIn }) =>
  loggedIn ? <Navigate to="/reviews" /> : <Outlet />;

const mapStateToProps = state => ({
  loggedIn: Boolean(state.session.id),
});

export const AuthRoutes = connect(mapStateToProps)(Auth);
