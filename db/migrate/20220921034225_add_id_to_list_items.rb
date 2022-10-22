class AddIdToListItems < ActiveRecord::Migration[5.2]
  def change
    add_column :list_items, :id, :primary_key
  end
end
