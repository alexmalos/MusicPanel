class ReplaceAlbumSingleColumnWithAlbumType < ActiveRecord::Migration[5.2]
  def change
    remove_column :albums, :single
    add_column :albums, :album_type, :string, null: false
  end
end
