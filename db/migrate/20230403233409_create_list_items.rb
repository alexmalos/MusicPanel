class CreateListItems < ActiveRecord::Migration[7.0]
  def change
    create_table :list_items, id: false do |t|
      t.belongs_to :list, index: true
      t.belongs_to :item, polymorphic: true
      t.integer :order_number, null: false

      t.timestamps
    end

    change_column :list_items, :list_id, :integer
    change_column :list_items, :item_id, :integer
    change_column_null :list_items, :item_id, false
    change_column_null :list_items, :item_type, false
    change_column_null :list_items, :list_id, false
  end
end
