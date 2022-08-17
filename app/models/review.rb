class Review < ApplicationRecord
    validates :rating, :item_type, presence: true
    validates :pinned, :private, inclusion: [true, false]

    belongs_to :author,
        class_name: :User

    belongs_to :item, polymorphic: true
end
