json.extract! artist, :id, :name, :birthday, :label, :origin, :website

json.albumIds do
    json.array! artist.albums.map { |album| album.id }
end

json.photoUrl url_for(artist.photo)
json.backgroundUrl url_for(artist.background)
json.smallBackgroundUrl url_for(artist.small_background)
