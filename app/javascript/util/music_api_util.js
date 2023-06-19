import axios from "axios";

export const fetchArtist = id =>
  axios.get(`/api/artists/${id}`).then(response => response.data);

export const fetchAlbum = id =>
  axios.get(`/api/albums/${id}`).then(response => response.data);

export const fetchTrack = id =>
  axios.get(`/api/tracks/${id}`).then(response => response.data);

export const fetchArtists = () =>
  axios.get("/api/artists").then(response => response.data);

export const fetchAlbums = () =>
  axios.get("/api/albums").then(response => response.data);

export const fetchTracks = () =>
  axios.get("/api/tracks").then(response => response.data);
