class CreateArtists < ActiveRecord::Migration[5.2]
  def change
    create_table :artists do |t|
      t.string :name, null: false
      t.string :birth_year, null: false
      t.string :gender, null: false
      t.string :label, null: false
      t.string :origin, null: false
      t.string :website, null: false

      t.timestamps
    end
  end
end
