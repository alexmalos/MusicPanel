class CreateAlbums < ActiveRecord::Migration[5.2]
  def change
    create_table :albums do |t|
      t.string :title, null: false
      t.string :type, null: false
      t.date :release_date, null: false
      t.string :label, null: false
      t.string :duration, null: false
      t.boolean :explicit, null: false
      t.integer :artist_id, null: false

      t.timestamps
    end

    add_index :albums, :artist_id
  end
end
