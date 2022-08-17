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

export const fetchSong = id => (
    $.ajax({
        method: 'GET',
        url: `/api/songs/${id}`
    })
);
