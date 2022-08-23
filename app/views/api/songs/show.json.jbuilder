json.album do
    json.partial! "api/albums/album", album: @song.album
end

json.artist do
    json.partial! "api/artists/artist", artist: @song.artist
end

json.tracks do
    @song.album.tracks.each do |track|
        json.set! track.id do
            json.partial! "api/songs/song", song: track
        end
    end
end

if @song.reviews.empty?
    json.reviews({})
    json.users({})
else
    json.reviews do
        @song.reviews.each do |review|
            json.set! review.id do
                json.partial! "api/reviews/review", review: review
            end
        end
    end

    json.users do
        @song.reviewers.each do |user|
            json.set! user.id do
                json.partial! "api/users/user", user: user
            end
        end
    end
end
