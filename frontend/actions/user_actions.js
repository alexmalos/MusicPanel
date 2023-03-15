import * as APIUtil from "../util/user_api_util";

export const RECEIVE_USER = 'RECEIVE_USER';

const receiveUser = ({ user, reviews, albums, artists, tracks, lists }) => ({
    type: RECEIVE_USER,
    user,
    reviews,
    albums,
    artists,
    tracks,
    lists
});

export const fetchUser = id => dispatch => (
    APIUtil.fetchUser(id).then(data => (
        dispatch(receiveUser(data))
    ))
);

export const updateUser = (id, user) => dispatch => (
    APIUtil.updateUser(id, user).then(data => (
        dispatch(receiveUser(data))
    ))
);
