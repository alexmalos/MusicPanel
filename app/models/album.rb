class Album < ApplicationRecord
    validates :title, :album_type, :release_date, :label, :duration, :genres, presence: true
    validates :explicit, inclusion: [true, false]

    belongs_to :artist
    has_many :tracks
    has_many :reviews, as: :item
    has_many :reviewers, through: :reviews, source: :author
    
    has_one_attached :cover
    has_one_attached :small_background
    has_one_attached :background

    def average_rating
        average = reviews.average(:rating).to_f / 2
        average.round(1)
    end
end
