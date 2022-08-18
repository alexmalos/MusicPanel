json.array! @songs.map do |song|
    json.partial! "api/songs/song", song: song
end
