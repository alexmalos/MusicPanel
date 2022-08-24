json.album do
    json.partial! "api/albums/album", album: @album
end

json.artist do
    json.partial! "api/artists/artist", artist: @album.artist
end

json.tracks do
    @album.tracks.each do |track|
        json.set! track.id do
            json.partial! "api/tracks/track", track: track
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

if @album.tracks.all? { |track| track.reviews.empty? }
    json.trackReviews({})
else
    json.trackReviews do
        @album.tracks.each do |track|
            track.reviews.each do |review|
                json.set! review.id do
                    json.partial! "api/reviews/review", review: review
                end
            end
        end
    end
end
