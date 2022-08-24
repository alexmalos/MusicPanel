class ChangeSongsToTracks < ActiveRecord::Migration[5.2]
  def change
    rename_table :songs, :tracks
  end
end
