class RemoveOrderNumberColumnFromListsTableAndAddToListItemsTale < ActiveRecord::Migration[5.2]
  def change
    remove_column :lists, :order_number
    add_column :list_items, :order_number, :integer
  end
end
