import React from "react";
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute } from "../util/route_util";
import ModalContainer from "./modal/modal_container";
import SplashContainer from "./splash/splash_container";
import ReviewsContainer from "./reviews/reviews_container";
import AlbumShowContainer from "./album/album_show_container";
import ArtistShowContainer from "./artist/artist_show_container";
import TrackShowContainer from "./track/track_show_container";
import Navbar from "./navbar/navbar";
import PageNotFound from "./page_not_found";

const App = ({ modal }) => (
  <div>
    <Navbar />
    <Switch>
      <Route path="/artists/:artistId" component={ArtistShowContainer}/>
      <Route path="/albums/:albumId" component={AlbumShowContainer} />
      <Route path="/tracks/:trackId" component={TrackShowContainer}/>
      <Route exact path="/reviews" component={ReviewsContainer} />
      <AuthRoute exact path="/" component={SplashContainer} />
      <Route exact path="/" />
      <Route path="/" component={PageNotFound} />
    </Switch>
    {(modal.modalType && !modal.data) ? <ModalContainer /> : null}
  </div>
);

const mapStateToProps = state => ({
  modal: state.ui.modal
});

export default connect(mapStateToProps)(App);
