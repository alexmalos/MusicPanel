json.extract! track, :id, :title, :track_number, :artist_id, :album_id

json.reviewIds do
    json.array! track.reviews.map { |review| review.id }
end

json.averageRating track.average_rating
