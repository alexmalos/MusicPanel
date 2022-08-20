json.album do
    json.partial! "api/albums/album", album: @album
end

json.artist do
    json.partial! "api/artists/artist", artist: @album.artist
end

json.tracks do
    json.array! @album.tracks.map do |track|
        json.partial! "api/songs/song", song: track
    end
end
