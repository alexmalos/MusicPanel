json.extract! artist, :id, :name, :birthday, :label, :origin, :website, :wiki_path, :instagram, :twitter, :spotify, :members, :formed

json.albumIds do
    json.array! artist.albums.map { |album| album.id }
end

json.photoUrl url_for(artist.photo)
json.backgroundUrl url_for(artist.background)
json.smallBackgroundUrl url_for(artist.small_background)

json.reviewIds do
    json.array! artist.reviews.map { |review| review.id }
end

ratingArray = artist.reviews.map { |review| review.rating }
averageRating = ratingArray.sum.to_f / ratingArray.length / 2
json.averageRating averageRating.round(1)
