# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all
Artist.delete_all
Album.delete_all
Song.delete_all

demo_user = User.create!(
    username: 'Demo User',
    password: 'password'
)

kanye = Artist.create!(
    name: 'Kanye West',
    birth_year: 1977,
    gender: 'M',
    label: 'Def Jam Recordings',
    origin: 'Chicago, Illinois, USA',
    website: 'https://www.kanyewest.com'
)

yeezus = Album.create!(
    title: "Yeezus",
    album_type: 'album',
    release_date: Date.new(2013, 6, 18),
    label: "Def Jam Recordings, Roc-A-Fella Records",
    duration: "40 minutes 0 seconds",
    explicit: true,
    artist_id: kanye.id
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
