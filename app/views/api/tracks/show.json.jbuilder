json.album do
    json.partial! "api/albums/album", album: @track.album
end

json.artist do
    json.partial! "api/artists/artist", artist: @track.artist
end

json.tracks do
    @track.album.tracks.each do |track|
        json.set! track.id do
            json.partial! "api/tracks/track", track: track
        end
    end
end

if @track.reviews.empty?
    json.reviews({})
    json.users({})
else
    json.reviews do
        @track.reviews.each do |review|
            json.set! review.id do
                json.partial! "api/reviews/review", review: review
            end
        end
    end

    json.users do
        @track.reviewers.each do |user|
            json.set! user.id do
                json.partial! "api/users/user", user: user
            end
        end
    end
end
