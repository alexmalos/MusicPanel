class ChangeAlbumsTypeColumn < ActiveRecord::Migration[5.2]
  def change
    rename_column :albums, :type, :single
    change_column :albums, :single, :boolean, using: 'single::boolean'
  end
end
