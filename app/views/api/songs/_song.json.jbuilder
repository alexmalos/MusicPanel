json.extract! song, :id, :title, :track_number, :artist_id, :album_id

json.reviewIds do
    json.array! song.reviews.map { |review| review.id }
end

json.averageRating song.average_rating
