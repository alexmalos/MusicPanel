class CreateTracks < ActiveRecord::Migration[7.0]
  def change
    create_table :tracks do |t|
      t.string :title, null: false
      t.integer :track_number, null: false
      t.integer :artist_id, null: false
      t.integer :album_id, null: false

      t.timestamps
    end

    add_index :tracks, :artist_id
    add_index :tracks, :album_id
  end
end
