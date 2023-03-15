class Artist < ApplicationRecord
    validates :name, :origin, :spotify, presence: true
    
    has_many :albums
    has_many :reviews, as: :item
    has_many :reviewers, through: :reviews, source: :author

    has_one_attached :photo
    has_one_attached :small_background
    has_one_attached :background

    def average_rating
        average = reviews.average(:rating).to_f / 2
        average.round(1)
    end
end
