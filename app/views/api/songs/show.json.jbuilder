json.album do
    json.partial! "api/albums/album", album: @song.album
end

json.artist do
    json.partial! "api/artists/artist", artist: @song.artist
end

json.tracks do
    json.array! @song.album.tracks.map do |track|
        json.partial! "api/songs/song", song: track
    end
end
