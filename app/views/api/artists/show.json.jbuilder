json.artist do
    json.partial! "api/artists/artist", artist: @artist
end

json.albums do
    json.array! @artist.albums.map do |album|
        json.partial! "api/albums/album", album: album
    end
end
