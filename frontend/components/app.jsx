import React from "react";
import { connect } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';
import { AuthRoute } from "../util/route_util";
import ModalContainer from "./modal/modal_container";
import SplashContainer from "./splash/splash_container";
import ReviewsContainer from "./reviews/reviews_container";
import SessionButtonsContainer from "./session_buttons/session_buttons_container";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

const App = ({ modal }) => (
  <div>
    <header>
      <div id="navbar-container">
        <div id="navbar">
          <Link to={"/"} id="logo"></Link>
          <div className="nav-button-div">
            <button>Music</button>
            <Link to={"/reviews"}>Reviews</Link>
            <Link to={"/lists"}>Lists</Link>
            <button id="more-button">
              <MoreHorizRoundedIcon />
            </button>
          </div>
          <SessionButtonsContainer />
        </div>
      </div>
    </header>
    <Switch>
      <Route exact path="/reviews" component={ReviewsContainer} />
      <AuthRoute exact path="/" component={SplashContainer} />
      <Route exact path="/" />
    </Switch>
    {modal ? <ModalContainer /> : null}
  </div>
);

const mapStateToProps = state => ({
  modal: state.ui.modal
});

export default connect(mapStateToProps)(App);
