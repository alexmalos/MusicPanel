class CreateLists < ActiveRecord::Migration[5.2]
  def change
    create_table :lists do |t|
      t.string :title, null: false
      t.text :description
      t.boolean :private, null: false
      t.boolean :pinned, null: false
      t.boolean :numbered, null: false
      t.integer :author_id, null: false
      
      t.timestamps
    end

    add_index :lists, :author_id
  end
end
