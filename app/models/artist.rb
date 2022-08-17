class Artist < ApplicationRecord
    validates :name, :birth_year, :gender, :label, :origin, :website, presence: true
    
    has_many :albums
    has_many :reviews, as: :item
end
