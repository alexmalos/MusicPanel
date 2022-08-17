json.extract! @album, :id, :title, :album_type, :release_date, :label, :duration, :explicit, :artist_id

json.tracks do
    json.array! @album.tracks.map { |track| track.id }
end
