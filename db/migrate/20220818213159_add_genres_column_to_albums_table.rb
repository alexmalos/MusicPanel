class AddGenresColumnToAlbumsTable < ActiveRecord::Migration[5.2]
  def change
    add_column :albums, :genres, :string, array: true, default: []
  end
end
