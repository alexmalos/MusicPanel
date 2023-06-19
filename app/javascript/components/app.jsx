/* eslint-disable react/prop-types */
import React from "react";
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { AuthRoutes } from "../util/route_util";
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
import ListIndex from "./lists/list_index";
import Navbar from "./navbar/navbar";
import PageNotFound from "./page_not_found";
import AlertContainer from "./alert/alert_container";
import UserShowContainer from "./users/user_show_container";
import UserReviewsContainer from "./users/user_reviews_container";
import UserListsContainer from "./users/user_lists_container";
import AlbumHome from "./album/album_home";
import ArtistHome from "./artist/artist_home";
import MusicReviewsContainer from "./music/music_reviews_container";
import ArtistDiscography from "./artist/artist_discography";

const App = ({ modal, alerts }) => (
  <div>
    <Navbar />
    <Routes>
      <Route path="/artists/:artistId" element={<ArtistShowContainer />}>
        <Route index element={<ArtistHome />} />
        <Route path="reviews" element={<MusicReviewsContainer />} />
        <Route path="releases" element={<ArtistDiscography />} />
      </Route>
      <Route path="/albums/:albumId" element={<AlbumShowContainer />}>
        <Route index element={<AlbumHome />} />
        <Route path="reviews" element={<MusicReviewsContainer />} />
        <Route path="ratings" element={<MusicReviewsContainer />} />
      </Route>
      <Route path="/tracks/:trackId" element={<TrackShowContainer />}>
        <Route path="reviews" element={<MusicReviewsContainer />} />
        <Route path="ratings" element={<MusicReviewsContainer />} />
      </Route>
      <Route
        exact
        path="/artists"
        element={<MusicIndexContainer musicType="artists" />}
      />
      <Route
        exact
        path="/albums"
        element={<MusicIndexContainer musicType="albums" />}
      />
      <Route
        exact
        path="/tracks"
        element={<MusicIndexContainer musicType="tracks" />}
      />
      <Route
        exact
        path="/reviews/:reviewId"
        element={<ReviewShowContainer />}
      />
      <Route
        exact
        path="/users/:userId/reviews"
        element={<UserReviewsContainer />}
      />
      <Route
        exact
        path="/users/:userId/lists"
        element={<UserListsContainer />}
      />
      <Route exact path="/users/:userId" element={<UserShowContainer />} />
      <Route exact path="/lists/:listId/edit" element={<EditListContainer />} />
      <Route exact path="/lists/new" element={<NewListContainer />} />
      <Route exact path="/lists/:listId" element={<ListShowContainer />} />
      <Route exact path="/reviews" element={<ReviewIndex />} />
      <Route exact path="/lists" element={<ListIndex />} />
      <Route element={<AuthRoutes />}>
        <Route exact path="/" element={<SplashContainer />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    {alerts.length > 0 ? <AlertContainer /> : null}
    {modal.modalType && !modal.data ? <ModalContainer /> : null}
  </div>
);

const mapStateToProps = ({ ui }) => ({
  modal: ui.modal,
  alerts: ui.alerts
});

export default connect(mapStateToProps)(App);
