json.extract! song, :id, :title, :track_number, :artist_id, :album_id

json.reviewIds do
    json.array! song.reviews.map { |review| review.id }
end

ratingArray = song.reviews.map { |review| review.rating }
averageRating = ratingArray.sum.to_f / ratingArray.length / 2
json.averageRating averageRating.round(1)
