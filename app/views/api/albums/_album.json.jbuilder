json.extract! album, :id, :title, :album_type, :release_date, :label, :duration, :explicit, :genres, :spotify, :artist_id

json.trackIds do
    json.array! album.tracks.map { |track| track.id }
end

json.coverUrl url_for(album.cover)
json.backgroundUrl url_for(album.background)
json.smallBackgroundUrl url_for(album.small_background)
