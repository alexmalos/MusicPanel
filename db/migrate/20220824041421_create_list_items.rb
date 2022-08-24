class CreateListItems < ActiveRecord::Migration[5.2]
  def change
    create_table :list_items, id: false do |t|
      t.belongs_to :list, index: true
      t.belongs_to :item, polymorphic: true
    end
  end
end
