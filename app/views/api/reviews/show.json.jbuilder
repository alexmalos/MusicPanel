json.review do
    json.partial! "api/reviews/review", review: @review
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
when 'Track'
    json.track do
        json.partial! "api/songs/song", song: @review.item
    end
end
