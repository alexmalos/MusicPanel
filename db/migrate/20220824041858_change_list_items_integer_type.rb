class ChangeListItemsIntegerType < ActiveRecord::Migration[5.2]
  def change
    change_column :list_items, :list_id, :integer
    change_column :list_items, :item_id, :integer
    change_column_null :list_items, :item_id, false
    change_column_null :list_items, :item_type, false
    change_column_null :list_items, :list_id, false
  end
end
