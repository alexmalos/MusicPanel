class AddNotNullConstraintToOrderNumberOnListItemsTable < ActiveRecord::Migration[5.2]
  def change
    change_column_null :list_items, :order_number, false
  end
end
