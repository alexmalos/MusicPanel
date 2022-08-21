import * as APIUtil from '../util/music_api_util';

export const RECEIVE_ARTIST = 'RECEIVE_ARTIST';
export const RECEIVE_ALBUM = 'RECEIVE_ALBUM';

const receiveArtist = ({ artist, albums}) => ({
    type: RECEIVE_ARTIST,
    artist,
    albums
});

const receiveAlbum = ({ album, artist, tracks }) => ({
    type: RECEIVE_ALBUM,
    album,
    artist,
    tracks
});

export const fetchArtist = id => dispatch => (
  APIUtil.fetchArtist(id).then(artist => (
    dispatch(receiveArtist(artist))
  ))
);

export const fetchAlbum = id => dispatch => (
  APIUtil.fetchAlbum(id).then(album => (
    dispatch(receiveAlbum(album))
  ))
);

export const fetchSong = id => dispatch => (
  APIUtil.fetchSong(id).then(album => (
    dispatch(receiveAlbum(album))
  ))
);
