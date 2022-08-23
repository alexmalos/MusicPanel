json.album do
    json.partial! "api/albums/album", album: @album
end

json.artist do
    json.partial! "api/artists/artist", artist: @album.artist
end

json.tracks do
    @album.tracks.each do |track|
        json.set! track.id do
            json.partial! "api/songs/song", song: track
        end
    end
end

if @album.reviews.empty?
    json.reviews({})
    json.users({})
else
    json.reviews do
        @album.reviews.each do |review|
            json.set! review.id do
                json.partial! "api/reviews/review", review: review
            end
        end
    end

    json.users do
        @album.reviewers.each do |user|
            json.set! user.id do
                json.partial! "api/users/user", user: user
            end
        end
    end
end
