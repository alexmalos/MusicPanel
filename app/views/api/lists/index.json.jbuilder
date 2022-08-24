json.lists do
    @lists.each do |list|
        json.set! list.id do
            json.partial! "api/lists/list", list: list
        end
    end
end

if @artists.empty?
    json.artists({})
else
    json.artists do
        @artists.each do |artist|
            json.set! artist.id do
                json.partial! "api/artists/artist", artist: artist
            end
        end
    end
end

if @albums.empty?
    json.albums({})
else
    json.albums do
        @albums.each do |album|
            json.set! album.id do
                json.partial! "api/albums/album", album: album
            end
        end
    end
end

if @tracks.empty?
    json.tracks({})
else
    json.tracks do
        @tracks.each do |track|
            json.set! track.id do
                json.partial! "api/tracks/track", track: track
            end
        end
    end
end

json.users do
    @users.each do |user|
        json.set! user.id do
            json.partial! "api/users/user", user: user
        end
    end
end
