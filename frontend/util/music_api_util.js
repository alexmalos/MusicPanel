export const fetchArtist = id => (
    $.ajax({
        method: 'GET',
        url: `/api/artists/${id}`
    })
);

export const fetchAlbum = id => (
    $.ajax({
        method: 'GET',
        url: `/api/albums/${id}`
    })
);

export const fetchTrack = id => (
    $.ajax({
        method: 'GET',
        url: `/api/tracks/${id}`
    })
);

export const fetchArtists = () => (
    $.ajax({
        method: 'GET',
        url: '/api/artists'
    })
);

export const fetchAlbums = () => (
    $.ajax({
        method: 'GET',
        url: '/api/albums'
    })
);

export const fetchTracks = () => (
    $.ajax({
        method: 'GET',
        url: '/api/tracks'
    })
);
