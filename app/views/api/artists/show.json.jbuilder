json.extract! @artist, :id, :name, :birth_year, :gender, :label, :origin, :website

json.albums do
    json.array! @artist.albums.map { |album| album.id }
end
