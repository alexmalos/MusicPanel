json.artists do
    @artists.each do |artist|
        json.set! artist.id do
            json.partial! "api/artists/artist", artist: artist
        end
    end
end

json.albums do
    @albums.each do |album|
        json.set! album.id do
            json.partial! "api/albums/album", album: album
        end
    end
end
