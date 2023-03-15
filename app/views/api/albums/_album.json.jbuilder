json.extract! album, :id, :title, :album_type, :release_date, :label, :duration, :explicit, :genres, :spotify, :artist_id

json.trackIds do
    json.array! album.tracks.map { |track| track.id }
end

if album.collaborators.length > 0
    json.collaborators do
        json.array! album.collaborators.map { |collaborator| { name: collaborator, id: Artist.find_by(name: collaborator) ? Artist.find_by(name:collaborator).id : nil } }
    end
end

json.coverUrl url_for(album.cover)

if album.background.attachment
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
