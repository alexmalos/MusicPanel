class Track < ApplicationRecord
    validates :title, :track_number, presence: true
    
    belongs_to :artist
    belongs_to :album
    has_many :reviews, as: :item
    has_many :reviewers, through: :reviews, source: :author

    def self.create_album!(artist, album, tracks)
        tracks.each_with_index do |title, i|
            Track.create!(
                title: title,
                track_number: i + 1,
                artist_id: artist.id,
                album_id: album.id
            )
        end
    end

    def average_rating
        average = reviews.average(:rating).to_f / 2
        average.round(1)
    end
end
