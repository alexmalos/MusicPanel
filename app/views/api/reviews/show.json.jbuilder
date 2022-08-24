json.review do
    json.partial! "api/reviews/review", review: @review
end

json.user do
    json.partial! "api/users/user", user: @review.author
end

case @review.item_type
when 'Artist'
    json.artist do
        json.partial! "api/artists/artist", artist: @review.item
    end
when 'Album'
    json.album do
        json.partial! "api/albums/album", album: @review.item
    end

    json.artist do
        json.partial! "api/artists/artist", artist: @review.item.artist
    end
when 'Track'
    json.track do
        json.partial! "api/tracks/track", track: @review.item
    end

    json.album do
        json.partial! "api/albums/album", album: @review.item.album
    end

    json.artist do
        json.partial! "api/artists/artist", artist: @review.item.artist
    end
end
