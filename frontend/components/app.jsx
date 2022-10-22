import React from "react";
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute } from "../util/route_util";
import ModalContainer from "./modal/modal_container";
import SplashContainer from "./splash/splash_container";
import ReviewShowContainer from "./reviews/review_show_container";
import ListShowContainer from "./lists/list_show_container";
import EditListContainer from "./lists/edit_list_container";
import NewListContainer from "./lists/new_list_container";
import AlbumShowContainer from "./album/album_show_container";
import ArtistShowContainer from "./artist/artist_show_container";
import TrackShowContainer from "./track/track_show_container";
import MusicIndexContainer from "./music/music_index_container";
import ReviewIndex from "./reviews/review_index";
import Navbar from "./navbar/navbar";
import PageNotFound from "./page_not_found";
import AlertContainer from "./alert/alert_container";
import UserShowContainer from "./users/user_show_container";
import UserReviewsContainer from "./users/user_reviews_container";

const App = ({ modal, alerts }) => (
  <div>
    <Navbar />
    <Switch>
      <Route path="/artists/:artistId" component={ArtistShowContainer}/>
      <Route path="/albums/:albumId" component={AlbumShowContainer} />
      <Route path="/tracks/:trackId" component={TrackShowContainer}/>
      <Route exact path="/artists">
        <MusicIndexContainer musicType='artists' />
      </Route>
      <Route exact path="/albums">
        <MusicIndexContainer musicType='albums' />
      </Route>
      <Route exact path="/tracks">
        <MusicIndexContainer musicType='tracks' />
      </Route>
      <Route exact path="/reviews/:reviewId" component={ReviewShowContainer} />
      <Route exact path="/users/:userId/reviews" component={UserReviewsContainer} />
      <Route exact path="/users/:userId" component={UserShowContainer} />
      <Route exact path="/lists/:listId/edit" component={EditListContainer} />
      <Route exact path="/lists/new" component={NewListContainer} />
      <Route exact path="/lists/:listId" component={ListShowContainer} />
      <Route exact path="/reviews" component={ReviewIndex}/>
      <AuthRoute exact path="/" component={SplashContainer} />
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
