class Artist < ApplicationRecord
    validates :name, :birthday, :label, :origin, :website, presence: true
    
    has_many :albums
    has_many :reviews, as: :item

    has_one_attached :photo
    has_one_attached :small_background
    has_one_attached :background
end
