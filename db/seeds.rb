# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'
require 'json'

User.destroy_all
Artist.destroy_all
Album.destroy_all
Track.destroy_all
Review.destroy_all
List.destroy_all

demo_user = User.create!(
    username: 'demo',
    password: 'password'
)

path = File.join(File.dirname(__FILE__), "./artists.json")
artists = JSON.parse(File.read(path))

artists.each do |artist|
    artist["birthday"] = Date.new(*artist["birthday"]) if artist["birthday"]
    new_artist = Artist.create!(artist.except("path", "albums"))
    artist_path = artist["path"]

    new_artist.photo.attach(
        io: open("https://music-panel-seeds.s3.amazonaws.com/#{artist_path}-photo.jpeg"),
        filename: "#{artist_path}-photo.jpeg"
    )

    new_artist.background.attach(
        io: open("https://music-panel-seeds.s3.amazonaws.com/#{artist_path}-background.jpeg"),
        filename: "#{artist_path}-background.jpeg"
    )
    
    new_artist.small_background.attach(
        io: open("https://music-panel-seeds.s3.amazonaws.com/#{artist_path}-background-small.jpeg"),
        filename: "#{artist_path}-background-small.jpeg"
    )

    artist["albums"].each do |album|
        album["release_date"] = Date.new(*album["release_date"])
        album["artist_id"] = new_artist.id
        new_album = Album.create!(album.except("path", "tracks"))
        album_path = album["path"]

        new_album.cover.attach(
            io: open("https://music-panel-seeds.s3.amazonaws.com/#{album_path}-cover.jpeg"),
            filename: "#{album_path}-cover.jpeg"
        )
    
        if album["background"]
            new_album.background.attach(
                io: open("https://music-panel-seeds.s3.amazonaws.com/#{album_path}-background.jpeg"),
                filename: "#{album_path}-background.jpeg"
            )
            
            new_album.small_background.attach(
                io: open("https://music-panel-seeds.s3.amazonaws.com/#{album_path}-background-small.jpeg"),
                filename: "#{album_path}-background-small.jpeg"
            )
        end

        Track.create_album!(new_artist, new_album, album["tracks"])
    end
end
