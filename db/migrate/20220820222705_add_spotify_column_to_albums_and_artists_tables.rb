class AddSpotifyColumnToAlbumsAndArtistsTables < ActiveRecord::Migration[5.2]
  def change
    add_column :albums, :spotify, :string, null: false
    add_column :artists, :spotify, :string, null: false
  end
end
