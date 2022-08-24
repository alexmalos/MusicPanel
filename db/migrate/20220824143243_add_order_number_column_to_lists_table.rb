class AddOrderNumberColumnToListsTable < ActiveRecord::Migration[5.2]
  def change
    add_column :lists, :order_number, :integer
  end
end
