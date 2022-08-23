import * as APIUtil from '../util/music_api_util';

export const RECEIVE_ARTIST = 'RECEIVE_ARTIST';
export const RECEIVE_ALBUM = 'RECEIVE_ALBUM';

const receiveArtist = ({ artist, albums, reviews, users }) => ({
    type: RECEIVE_ARTIST,
    artist,
    albums,
    reviews,
    users
});

const receiveAlbum = ({ album, artist, tracks, reviews, users }) => ({
    type: RECEIVE_ALBUM,
    album,
    artist,
    tracks,
    reviews,
    users
});

export const fetchArtist = id => dispatch => (
  APIUtil.fetchArtist(id).then(data => (
    dispatch(receiveArtist(data))
  ))
);

export const fetchAlbum = id => dispatch => (
  APIUtil.fetchAlbum(id).then(data => (
    dispatch(receiveAlbum(data))
  ))
);

export const fetchSong = id => dispatch => (
  APIUtil.fetchSong(id).then(data => (
    dispatch(receiveAlbum(data))
  ))
);
