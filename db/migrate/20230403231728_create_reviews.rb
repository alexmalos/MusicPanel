class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.integer :rating, null: false
      t.boolean :pinned, null: false
      t.boolean :private, null: false
      t.string :title
      t.text :body
      t.integer :author_id, null: false
      t.references :item, polymorphic: true

      t.timestamps
    end

    add_index :reviews, :author_id
    change_column :reviews, :item_id, :integer
    change_column_null :reviews, :item_id, false
    change_column_null :reviews, :item_type, false
  end
end
