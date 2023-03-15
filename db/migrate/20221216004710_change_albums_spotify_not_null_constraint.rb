class ChangeAlbumsSpotifyNotNullConstraint < ActiveRecord::Migration[5.2]
  def change
    change_column_null :albums, :spotify, true
  end
end
