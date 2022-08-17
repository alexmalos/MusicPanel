class Album < ApplicationRecord
    validates :title, :album_type, :release_date, :label, :duration, presence: true
    validates :explicit, inclusion: [true, false]

    belongs_to :artist
    has_many :tracks,
        class_name: :Song
    has_many :reviews, as: :item
end
