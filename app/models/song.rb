class Song < ApplicationRecord
    validates :title, :track_number, presence: true
    
    belongs_to :artist
    belongs_to :album
    has_many :reviews, as: :item

    def self.create_album!(artist, album, songs)
        songs.each_with_index do |title, i|
            Song.create!(
                title: title,
                track_number: i + 1,
                artist_id: artist.id,
                album_id: album.id
            )
        end
    end
end
