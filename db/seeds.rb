# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'

genres = {
    pop: 'Pop',
    rap: 'Rap/Hip Hop',
    alt: 'Alternative',
    rock: 'Rock',
    rnb: 'R&B/Soul',
    electro: 'Electronic',
    folk: 'Folk',
    country: 'Country',
    jazz: 'Jazz',
    blues: 'Blues',
    latin: 'Latin',
    classical: 'Classical'
}

User.delete_all
Artist.delete_all
Album.delete_all
Song.delete_all

demo_user = User.create!(
    username: 'demo',
    password: 'password'
)

kanye = Artist.create!(
    name: 'Kanye West',
    birthday: Date.new(1977, 6, 8),
    label: 'Def Jam Recordings',
    origin: 'Chicago, Illinois, USA',
    website: 'https://www.kanyewest.com',
    wiki_path: 'Kanye_West'
)

kanye.photo.attach(
    io: open('https://music-panel-seeds.s3.amazonaws.com/kanye-photo.jpeg'),
    filename: 'kanye-photo.jpeg'
)

kanye.background.attach(
    io: open('https://music-panel-seeds.s3.amazonaws.com/kanye-background.jpeg'),
    filename: 'kanye-background.jpeg'
)

kanye.small_background.attach(
    io: open('https://music-panel-seeds.s3.amazonaws.com/kanye-background-small.jpeg'),
    filename: 'kanye-background-small.jpeg'
)

yeezus = Album.create!(
    title: "Yeezus",
    album_type: 'Album',
    release_date: Date.new(2013, 6, 18),
    label: "Def Jam Recordings, Roc-A-Fella Records",
    duration: "40 minutes 0 seconds",
    explicit: true,
    genres: [genres[:rap]],
    artist_id: kanye.id
)

yeezus.cover.attach(
    io: open('https://music-panel-seeds.s3.amazonaws.com/yeezus-cover.png'),
    filename: 'yeezus-cover.png'
)

yeezus.background.attach(
    io: open('https://music-panel-seeds.s3.amazonaws.com/yeezus-background.jpeg'),
    filename: 'yeezus-background.jpeg'
)

yeezus.small_background.attach(
    io: open('https://music-panel-seeds.s3.amazonaws.com/yeezus-background-small.jpeg'),
    filename: 'yeezus-background-small.jpeg'
)

yeezus_tracklist = [
    'On Sight',
    'Black Skinhead',
    'I Am A God',
    'New Slaves',
    'Hold My Liquor',
    "I'm In It",
    'Blood On The Leaves',
    'Guilt Trip',
    'Send It Up',
    'Bound 2'
]

Song.create_album!(kanye, yeezus, yeezus_tracklist)
