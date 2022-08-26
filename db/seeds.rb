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
Track.delete_all

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
    twitter: 'kanyewest',
    instagram: 'kanyewest/',
    spotify: 'artist/5K4W6rqBFWDnAN6FQUkS6x',
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

donda = Album.create!(
    title: "Donda",
    album_type: 'Album',
    release_date: Date.new(2021, 8, 29),
    label: "GOOD Music, Def Jam Recordings",
    duration: "1 hour 8 minutes 48 seconds",
    explicit: false,
    genres: [genres[:rap]],
    spotify: 'album/5CnpZV3q5BcESefcB3WJmz',
    artist_id: kanye.id
)

donda.cover.attach(
    io: open('https://music-panel-seeds.s3.amazonaws.com/donda-cover-500.jpeg'),
    filename: 'donda-cover-500.jpeg'
)

donda.background.attach(
    io: open('https://music-panel-seeds.s3.amazonaws.com/donda-background.jpeg'),
    filename: 'donda-background.jpeg'
)

donda.small_background.attach(
    io: open('https://music-panel-seeds.s3.amazonaws.com/donda-background-small.jpeg'),
    filename: 'donda-background-small.jpeg'
)

donda_tracklist = [
    'Donda Chant',
    'Jail',
    'God Breathed',
    'Off the Grid',
    'Hurricane',
    'Praise God',
    'Jonah',
    'Ok Ok',
    'Junya',
    'Believe What I Say',
    '24',
    'Remote Control',
    'Moon',
    "Heaven and Hell",
    'Donda',
    'Keep My Spirit Alive',
    'Jesus Lord',
    'New Again',
    'Tell the Vision',
    'Lord I Need You',
    'Pure Souls',
    'Come to Life',
    'No Child Left Behind',
    'Jail pt 2',
    'Ok Ok pt 2',
    'Junya pt 2',
    'Jesus Lord pt 2'
]

Track.create_album!(kanye, donda, donda_tracklist)

jik = Album.create!(
    title: "Jesus Is King",
    album_type: 'Album',
    release_date: Date.new(2019, 10, 25),
    label: "GOOD Music, Def Jam Recordings",
    duration: "27 minutes 4 seconds",
    explicit: false,
    genres: ['Gospel'],
    spotify: 'album/0FgZKfoU2Br5sHOfvZKTI9',
    artist_id: kanye.id
)

jik.cover.attach(
    io: open('https://music-panel-seeds.s3.amazonaws.com/jesus-is-king-cover-500.jpeg'),
    filename: 'jesus-is-king-cover-500.jpeg'
)

jik.background.attach(
    io: open('https://music-panel-seeds.s3.amazonaws.com/jesus-is-king-background.jpeg'),
    filename: 'jesus-is-king-background.jpeg'
)

jik.small_background.attach(
    io: open('https://music-panel-seeds.s3.amazonaws.com/jesus-is-king-background-small.jpeg'),
    filename: 'jesus-is-king-background-small.jpeg'
)

jik_tracklist = [
    'Every Hour',
    'Selah',
    'Follow God',
    'Closed on Sunday',
    'On God',
    'Everything We Need',
    'Water',
    'God Is',
    'Hands On',
    'Use This Gospel',
    'Jesus Is Lord'
]

Track.create_album!(kanye, jik, jik_tracklist)

ye = Album.create!(
    title: "Ye",
    album_type: 'Album',
    release_date: Date.new(2018, 6, 14),
    label: "GOOD Music, Def Jam Recordings",
    duration: "23 minutes 41 seconds",
    explicit: true,
    genres: [genres[:rap]],
    spotify: 'album/2Ek1q2haOnxVqhvVKqMvJe',
    artist_id: kanye.id
)

ye.cover.attach(
    io: open('https://music-panel-seeds.s3.amazonaws.com/ye-cover-500.jpeg'),
    filename: 'the-life-of-pablo-cover-500.jpeg'
)

ye_tracklist = [
    'I Thought About Killing You',
    'Yikes',
    'All Mine',
    "Wouldn't Leave",
    'No Mistakes',
    'Ghost Town',
    'Violent Crimes'
]

Track.create_album!(kanye, ye, ye_tracklist)

tlop = Album.create!(
    title: "The Life of Pablo",
    album_type: 'Album',
    release_date: Date.new(2016, 2, 14),
    label: "GOOD Music, Def Jam Recordings",
    duration: "1 hour 6 minutes 1 second",
    explicit: true,
    genres: [genres[:rap]],
    spotify: 'album/7gsWAHLeT0w7es6FofOXk1',
    artist_id: kanye.id
)

tlop.cover.attach(
    io: open('https://music-panel-seeds.s3.amazonaws.com/the-life-of-pablo-cover-500.jpeg'),
    filename: 'the-life-of-pablo-cover-500.jpeg'
)

tlop.background.attach(
    io: open('https://music-panel-seeds.s3.amazonaws.com/the-life-of-pablo-background.jpeg'),
    filename: 'the-life-of-pablo-background.jpeg'
)

tlop.small_background.attach(
    io: open('https://music-panel-seeds.s3.amazonaws.com/the-life-of-pablo-background-small.jpeg'),
    filename: 'the-life-of-pablo-background-small.jpeg'
)

tlop_tracklist = [
    'Ultralight Beam',
    'Father Stretch My Hands, Pt. 1',
    'Pt. 2',
    'Famous',
    'Feedback',
    'Low Lights',
    'Highlights',
    'Freestyle 4',
    'I Love Kanye',
    'Waves',
    'FML',
    'Real Friends',
    'Wolves',
    "Frank's Track",
    'Siiiiiiiiilver Surffffeeeeer Intermission',
    '30 Hours',
    'No More Parties in LA',
    'Facts (Charlie Heat Version)',
    'Fade',
    'Saint Pablo'
]

Track.create_album!(kanye, tlop, tlop_tracklist)

yeezus = Album.create!(
    title: "Yeezus",
    album_type: 'Album',
    release_date: Date.new(2013, 6, 18),
    label: "Def Jam Recordings, Roc-A-Fella Records",
    duration: "40 minutes 1 second",
    explicit: true,
    genres: [genres[:rap]],
    spotify: 'album/7D2NdGvBHIavgLhmcwhluK',
    artist_id: kanye.id
)

yeezus.cover.attach(
    io: open('https://music-panel-seeds.s3.amazonaws.com/yeezus-cover-500.jpeg'),
    filename: 'yeezus-cover-500.jpeg'
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
    'I Am a God',
    'New Slaves',
    'Hold My Liquor',
    "I'm in It",
    'Blood on the Leaves',
    'Guilt Trip',
    'Send It Up',
    'Bound 2'
]

Track.create_album!(kanye, yeezus, yeezus_tracklist)

mbdtf = Album.create!(
    title: "My Beautiful Dark Twisted Fantasy",
    album_type: 'Album',
    release_date: Date.new(2010, 11, 22),
    label: "Def Jam Recordings, Roc-A-Fella Records",
    duration: "1 hour 8 minutes 39 seconds",
    explicit: true,
    genres: [genres[:rap]],
    spotify: 'album/20r762YmB5HeofjMCiPMLv',
    artist_id: kanye.id
)

mbdtf.cover.attach(
    io: open('https://music-panel-seeds.s3.amazonaws.com/my-beautiful-dark-twisted-fantasy-cover-500.jpeg'),
    filename: 'my-beautiful-dark-twisted-fantasy-cover-500.jpeg'
)

mbdtf.background.attach(
    io: open('https://music-panel-seeds.s3.amazonaws.com/my-beautiful-dark-twisted-fantasy-background.jpeg'),
    filename: 'my-beautiful-dark-twisted-fantasy-background.jpeg'
)

mbdtf.small_background.attach(
    io: open('https://music-panel-seeds.s3.amazonaws.com/my-beautiful-dark-twisted-fantasy-background-small.jpeg'),
    filename: 'my-beautiful-dark-twisted-fantasy-background-small.jpeg'
)

mbdtf_tracklist = [
    'Dark Fantasy',
    'Gorgeous',
    'POWER',
    'All of the Lights (Interlude)',
    'All of the Lights',
    'Monster',
    'So Appalled',
    'Devil in a New Dress',
    'Runaway',
    'Hell of a Life',
    'Blame Game',
    'Lost in the World',
    'Who Will Survive in America'
]

Track.create_album!(kanye, mbdtf, mbdtf_tracklist)

heartbreak = Album.create!(
    title: "808s & Heartbreak",
    album_type: 'Album',
    release_date: Date.new(2008, 11, 24),
    label: "Def Jam Recordings, Roc-A-Fella Records",
    duration: "52 minutes 5 seconds",
    explicit: false,
    genres: [genres[:electro], genres[:pop]],
    spotify: 'album/3WFTGIO6E3Xh4paEOBY9OU',
    artist_id: kanye.id
)

heartbreak.cover.attach(
    io: open('https://music-panel-seeds.s3.amazonaws.com/808s-and-heartbreak-cover-500.jpeg'),
    filename: '808s-and-heartbreak-cover-500.jpeg'
)

heartbreak.background.attach(
    io: open('https://music-panel-seeds.s3.amazonaws.com/808s-and-heartbreak-background.jpeg'),
    filename: '808s-and-heartbreak-background.jpeg'
)

heartbreak.small_background.attach(
    io: open('https://music-panel-seeds.s3.amazonaws.com/808s-and-heartbreak-background-small.jpeg'),
    filename: '808s-and-heartbreak-background-small.jpeg'
)

heartbreak_tracklist = [
    'Say You Will',
    'Welcome to Heartbreak',
    'Heartless',
    'Amazing',
    'Love Lockdown',
    'Paranoid',
    'RoboCop',
    'Street Lights',
    'Bad News',
    'See You in My Nightmares',
    'Coldest Winter',
    'Pinocchio Story'
]

Track.create_album!(kanye, heartbreak, heartbreak_tracklist)

graduation = Album.create!(
    title: "Graduation",
    album_type: 'Album',
    release_date: Date.new(2007, 9, 11),
    label: "Def Jam Recordings, Roc-A-Fella Records",
    duration: "51 minutes 23 seconds",
    explicit: true,
    genres: [genres[:rap]],
    spotify: 'album/4SZko61aMnmgvNhfhgTuD3',
    artist_id: kanye.id
)

graduation.cover.attach(
    io: open('https://music-panel-seeds.s3.amazonaws.com/graduation-cover-500.jpeg'),
    filename: 'graduation-cover-500.jpeg'
)

graduation_tracklist = [
    'Good Morning',
    'Champion',
    'Stronger',
    'I Wonder',
    'Good Life',
    "Can't Tell Me Nothing",
    'Barry Bonds',
    'Drunk and Hot Girls',
    'Flashing Lights',
    'Everything I Am',
    'The Glory',
    'Homecoming',
    'Big Brother',
    'Good Night'
]

Track.create_album!(kanye, graduation, graduation_tracklist)

lr = Album.create!(
    title: "Late Registration",
    album_type: 'Album',
    release_date: Date.new(2005, 8, 30),
    label: "Def Jam Recordings, Roc-A-Fella Records",
    duration: "1 hour 10 minutes 25 seconds",
    explicit: true,
    genres: [genres[:rap]],
    spotify: 'album/5ll74bqtkcXlKE7wwkMq4g',
    artist_id: kanye.id
)

lr.cover.attach(
    io: open('https://music-panel-seeds.s3.amazonaws.com/late-registration-cover-500.jpeg'),
    filename: 'late-registration-cover-500.jpeg'
)

lr_tracklist = [
    'Wake Up Mr. West',
    "Heard 'Em Say",
    'Touch the Sky',
    'Gold Digger',
    'Skit No. 1',
    'Drive Slow',
    'My Way Home',
    'Crack Music',
    'Roses',
    'Bring Me Down',
    'Addiction',
    'Skit No. 2',
    'Diamonds from Sierra Leone (Remix)',
    "We Major",
    'Skit No. 3',
    'Hey Mama',
    'Celebration',
    'Skit No. 4',
    'Diamonds from Sierra Leone - Bonus Track',
    'Late'
]

Track.create_album!(kanye, lr, lr_tracklist)

tcd = Album.create!(
    title: "The College Dropout",
    album_type: 'Album',
    release_date: Date.new(2004, 2, 10),
    label: "Def Jam Recordings, Roc-A-Fella Records",
    duration: "1 hour 16 minutes 13 seconds",
    explicit: true,
    genres: [genres[:rap]],
    spotify: 'album/4Uv86qWpGTxf7fU7lG5X6F',
    artist_id: kanye.id
)

tcd.cover.attach(
    io: open('https://music-panel-seeds.s3.amazonaws.com/the-college-dropout-cover-500.jpeg'),
    filename: 'the-college-dropout-cover-500.jpeg'
)

tcd.background.attach(
    io: open('https://music-panel-seeds.s3.amazonaws.com/the-college-dropout-background.jpeg'),
    filename: 'the-college-dropout-background.jpeg'
)

tcd.small_background.attach(
    io: open('https://music-panel-seeds.s3.amazonaws.com/the-college-dropout-background-small.jpeg'),
    filename: 'the-college-dropout-background-small.jpeg'
)

tcd_tracklist = [
    'Intro',
    "We Don't Care",
    'Graduation Day',
    'All Falls Down',
    "I'll Fly Away",
    'Spaceship',
    'Jesus Walks',
    'Never Let Me Down',
    'Get Em High',
    'Workout Plan',
    'The New Workout Plan',
    'Slow Jamz',
    'Breathe In Breathe Out',
    "School Spirit Skit 1",
    'School Spirit',
    'School Spirit Skit 2',
    'Lil Jimmy Skit',
    'Two Words',
    'Through the Wire',
    'Family Business',
    'Last Call'
]

Track.create_album!(kanye, tcd, tcd_tracklist)
