import React from "react";
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute } from "../util/route_util";
import ModalContainer from "./modal/modal_container";
import SplashContainer from "./splash/splash_container";
import ReviewShowContainer from "./reviews/review_show_container";
import AlbumShowContainer from "./album/album_show_container";
import ArtistShowContainer from "./artist/artist_show_container";
import TrackShowContainer from "./track/track_show_container";
import ReviewIndex from "./reviews/review_index";
import Navbar from "./navbar/navbar";
import PageNotFound from "./page_not_found";
import AlertContainer from "./alert/alert_container";

const App = ({ modal, alerts }) => (
  <div>
    <Navbar />
    <Switch>
      <Route path="/artists/:artistId" component={ArtistShowContainer}/>
      <Route path="/albums/:albumId" component={AlbumShowContainer} />
      <Route path="/tracks/:trackId" component={TrackShowContainer}/>
      <Route path="/reviews/:reviewId" component={ReviewShowContainer} />
      <Route exact path="/reviews" component={ReviewIndex}/>
      <AuthRoute exact path="/" component={SplashContainer} />
      <Route exact path="/" />
      <Route path="/" component={PageNotFound} />
    </Switch>
    {alerts.length > 0 ? <AlertContainer /> : null}
    {(modal.modalType && !modal.data) ? <ModalContainer /> : null}
  </div>
);

const mapStateToProps = ({ ui }) => ({
  modal: ui.modal,
  alerts: ui.alerts
});

export default connect(mapStateToProps)(App);
