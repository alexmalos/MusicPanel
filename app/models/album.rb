class Album < ApplicationRecord
    validates :title, :album_type, :release_date, :label, :duration, :genres, presence: true
    validates :explicit, inclusion: [true, false]

    belongs_to :artist
    has_many :tracks,
        class_name: :Song
    has_many :reviews, as: :item
    
    has_one_attached :cover
    has_one_attached :small_background
    has_one_attached :background
end
