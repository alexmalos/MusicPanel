class AddIdToListItems < ActiveRecord::Migration[7.0]
  def change
    add_column :list_items, :id, :primary_key
  end
end
