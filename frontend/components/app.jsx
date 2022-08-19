import React from "react";
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute } from "../util/route_util";
import ModalContainer from "./modal/modal_container";
import SplashContainer from "./splash/splash_container";
import ReviewsContainer from "./reviews/reviews_container";
import AlbumShowContainer from "./album/album_container";
import Navbar from "./navbar/navbar";

const App = ({ modal }) => (
  <div>
    <Navbar />
    <Switch>
      <Route path="/artists/:artistId" />
      <Route path="/albums/:albumId" component={AlbumShowContainer} />
      <Route path="/songs/:songId" />
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
