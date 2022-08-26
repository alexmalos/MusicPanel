json.extract! album, :id, :title, :album_type, :release_date, :label, :duration, :explicit, :genres, :spotify, :artist_id

json.trackIds do
    json.array! album.tracks.map { |track| track.id }
end

json.coverUrl url_for(album.cover)

if user.background.attachment
    json.backgroundUrl url_for(album.background)
    json.smallBackgroundUrl url_for(album.small_background)
else
    json.backgroundUrl nil
    json.smallBackgroundUrl nil
end

# json.backgroundUrl url_for(album.background)
# json.smallBackgroundUrl url_for(album.small_background)

json.reviewIds do
    json.array! album.reviews.map { |review| review.id }
end

json.averageRating album.average_rating
