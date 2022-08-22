import * as APIUtil from '../util/review_api_util';
import { openAlert } from './alert_actions';

export const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS';
export const RECEIVE_REVIEW = 'RECEIVE_REVIEW';
export const REMOVE_REVIEW = 'DELETE_REVIEW';

const receiveReviews = reviews => ({
    type: RECEIVE_REVIEWS,
    reviews
});

const receiveReview = review => ({
    type: RECEIVE_REVIEW,
    review
});

const removeReview = id => ({
    type: REMOVE_REVIEW,
    id
});

export const fetchReviews = () => dispatch => (
  APIUtil.fetchReviews().then(reviews => (
    dispatch(receiveReviews(reviews))
  ))
);

export const fetchReview = id => dispatch => (
  APIUtil.fetchReview(id).then(review => (
    dispatch(receiveReview(review))
  ))
);

export const createReview = review => dispatch => (
    APIUtil.createReview(review).then(review => {
      dispatch(receiveReview(review));
      dispatch(openAlert(review, 'newReview'));
    })
);

export const updateReview = review => dispatch => (
  APIUtil.updateReview(review).then(review => {
    dispatch(receiveReview(review));
    dispatch(openAlert(review, 'editReview'));
  })
);

export const deleteReview = id => dispatch => (
    APIUtil.deleteReview(id).then(() => (
      dispatch(removeReview(id))
    ))
);
