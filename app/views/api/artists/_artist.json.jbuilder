json.extract! artist, :id, :name, :birthday, :origin, :website, :wiki_path, :instagram, :twitter, :spotify, :members, :formed

json.albumIds do
    json.array! artist.albums.map { |album| album.id }
end

json.photoUrl url_for(artist.photo)
json.backgroundUrl url_for(artist.background)
json.smallBackgroundUrl url_for(artist.small_background)

json.reviewIds do
    json.array! artist.reviews.map { |review| review.id }
end

json.averageRating artist.average_rating
