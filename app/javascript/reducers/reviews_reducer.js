import { RECEIVE_ALBUM, RECEIVE_ARTIST } from '../actions/music_actions';
import {
    RECEIVE_REVIEWS,
    RECEIVE_REVIEW,
    REMOVE_REVIEW,
} from '../actions/review_actions';
import { RECEIVE_USER } from '../actions/user_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    const newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_REVIEWS:
        case RECEIVE_ARTIST:
        case RECEIVE_USER:
            return Object.assign({}, state, action.reviews);
        case RECEIVE_ALBUM:
            return Object.assign({}, state, action.reviews, action.trackReviews);
        case RECEIVE_REVIEW:
            newState[action.review.id] = action.review;
            return newState;
        case REMOVE_REVIEW:
            delete newState[action.reviewId];
            return newState;
        default:
            return state;
    }
};
