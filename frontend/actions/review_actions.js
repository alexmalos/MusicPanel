import * as APIUtil from '../util/review_api_util';
import { openAlert } from './alert_actions';

export const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS';
export const RECEIVE_REVIEW = 'RECEIVE_REVIEW';
export const REMOVE_REVIEW = 'DELETE_REVIEW';

const receiveReviews = ({ reviews, artists, albums, tracks, users }) => ({
    type: RECEIVE_REVIEWS,
    reviews,
    artists,
    albums,
    tracks,
    users
});

const receiveReview = ({ review, artist, album, track, user }) => ({
    type: RECEIVE_REVIEW,
    review,
    artist,
    album,
    track,
    user
});

const removeReview = ({ review, artist, album, track }) => ({
    type: REMOVE_REVIEW,
    reviewId: review.id,
    artist,
    album,
    track
});

export const fetchReviews = () => dispatch => (
  APIUtil.fetchReviews().then(data => (
    dispatch(receiveReviews(data))
  ))
);

export const fetchReview = id => dispatch => (
  APIUtil.fetchReview(id).then(data => (
    dispatch(receiveReview(data))
  ))
);

export const createReview = review => dispatch => (
    APIUtil.createReview(review).then(data => {
      dispatch(receiveReview(data));
      dispatch(openAlert({
        review: data.review,
        alertType: 'newReview',
        fired: false
      }));
    })
);

export const updateReview = review => dispatch => (
  APIUtil.updateReview(review).then(data => {
    dispatch(receiveReview(data));
    dispatch(openAlert({
        review: data.review,
        alertType: 'editReview',
        fired: false
    }));
  })
);

export const deleteReview = id => dispatch => (
    APIUtil.deleteReview(id).then(data => (
      dispatch(removeReview(data))
    ))
);
