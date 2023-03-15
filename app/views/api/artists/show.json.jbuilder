json.artist do
    json.partial! "api/artists/artist", artist: @artist
end

json.albums do
    @artist.albums.each do |album|
        json.set! album.id do
            json.partial! "api/albums/album", album: album
        end
    end
    Album.where("'#{@artist.name}' = ANY (collaborators)").each do |album|
        json.set! album.id do
            json.partial! "api/albums/album", album: album
        end
    end
end

if @artist.reviews.empty?
    json.reviews({})
    json.users({})
else
    json.reviews do
        @artist.reviews.each do |review|
            json.set! review.id do
                json.partial! "api/reviews/review", review: review
            end
        end
    end

    json.users do
        @artist.reviewers.each do |user|
            json.set! user.id do
                json.partial! "api/users/user", user: user
            end
        end
    end
end
