import * as APIUtil from '../util/music_api_util';

export const RECEIVE_ARTIST = 'RECEIVE_ARTIST';
export const RECEIVE_ALBUM = 'RECEIVE_ALBUM';
export const RECEIVE_SONG = 'RECEIVE_SONG';

const receiveArtist = artist => ({
    type: RECEIVE_ARTIST,
    artist
});

const receiveAlbum = album => ({
    type: RECEIVE_ALBUM,
    album
});

const receiveSong = song => ({
    type: RECEIVE_SONG,
    song
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
  APIUtil.fetchSong(id).then(song => (
    dispatch(receiveSong(song))
  ))
);
