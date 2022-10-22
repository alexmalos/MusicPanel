class List < ApplicationRecord
    validates :title, presence: true
    validates :pinned, :private, :numbered, inclusion: [true, false]

    belongs_to :author, class_name: :User
    has_many :list_items, -> { order 'order_number' }, dependent: :destroy
    
    def items(item_type)
        type_list_items = list_items.select { |list_item| list_item.item_type == item_type }
        type_list_items.map { |list_item| list_item.item }
    end

    def nilify_blank_description
        self.description = nil if self.description == ''
    end
end
