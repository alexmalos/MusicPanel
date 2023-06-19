class CreateAlbums < ActiveRecord::Migration[7.0]
  def change
    create_table :albums do |t|
      t.string :title, null: false
      t.string :album_type, null: false
      t.date :release_date, null: false
      t.string :label, null: false
      t.integer :duration, null: false
      t.boolean :explicit, null: false
      t.integer :artist_id, null: false
      t.string :genres, array: true, default: []
      t.string :spotify
      t.string :collaborators, array: true, default: []

      t.timestamps
    end

    add_index :albums, :artist_id
  end
end
