class Review < ApplicationRecord
    validates :rating, :item_type, presence: true
    validates :pinned, :private, inclusion: [true, false]

    belongs_to :author,
        class_name: :User

    belongs_to :item, polymorphic: true

    def self.full_reviews
        Review.all.select { |review| review.body || review.title }
    end

    def nilify_blanks
        self.title = nil if self.title == ''
        self.body = nil if self.body == ''
    end
end
