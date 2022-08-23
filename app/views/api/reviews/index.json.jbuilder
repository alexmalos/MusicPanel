json.reviews do
    @reviews.each do |review|
        json.set! review.id do
            json.partial! "api/reviews/review", review: review
        end
    end
end

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

json.tracks do
    @tracks.each do |track|
        json.set! track.id do
            json.partial! "api/songs/song", song: track
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
