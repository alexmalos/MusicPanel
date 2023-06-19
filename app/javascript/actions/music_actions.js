import * as APIUtil from '../util/music_api_util';

export const RECEIVE_ARTIST = 'RECEIVE_ARTIST';
export const RECEIVE_ALBUM = 'RECEIVE_ALBUM';
export const RECEIVE_ARTISTS = 'RECEIVE_ARTISTS';
export const RECEIVE_ALBUMS = 'RECEIVE_ALBUMS';
export const RECEIVE_TRACKS = 'RECEIVE_TRACKS';

const receiveArtist = ({ artist, albums, reviews, users }) => ({
  type: RECEIVE_ARTIST,
  artist,
  albums,
  reviews,
  users
});

const receiveAlbum = ({ album, artist, tracks, reviews, users, trackReviews }) => ({
  type: RECEIVE_ALBUM,
  album,
  artist,
  tracks,
  reviews,
  users,
  trackReviews
});

const receiveArtists = ({ artists }) => ({
  type: RECEIVE_ARTISTS,
  artists
});

const receiveAlbums = ({ artists, albums }) => ({
  type: RECEIVE_ALBUMS,
  artists,
  albums
});

const receiveTracks = ({ artists, albums, tracks }) => ({
  type: RECEIVE_TRACKS,
  artists,
  albums,
  tracks
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

export const fetchTrack = id => dispatch => (
  APIUtil.fetchTrack(id).then(data => (
    dispatch(receiveAlbum(data))
  ))
);

export const fetchArtists = () => dispatch => (
  APIUtil.fetchArtists().then(data => (
    dispatch(receiveArtists(data))
  ))
);

export const fetchAlbums = () => dispatch => (
  APIUtil.fetchAlbums().then(data => (
    dispatch(receiveAlbums(data))
  ))
);

export const fetchTracks = () => dispatch => (
  APIUtil.fetchTracks().then(data => (
    dispatch(receiveTracks(data))
  ))
);
