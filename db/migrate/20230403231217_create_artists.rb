class CreateArtists < ActiveRecord::Migration[7.0]
  def change
    create_table :artists do |t|
      t.string :name, null: false
      t.date :birthday, null: false
      t.string :origin, null: false
      t.string :website
      t.string :wiki_path
      t.string :twitter
      t.string :instagram
      t.string :members, array: true, default: []
      t.integer :formed
      t.string :spotify, null: false

      t.timestamps
    end
  end
end
