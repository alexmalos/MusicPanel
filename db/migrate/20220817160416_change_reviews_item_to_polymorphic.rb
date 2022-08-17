class ChangeReviewsItemToPolymorphic < ActiveRecord::Migration[5.2]
  def change
    remove_column :reviews, :item_type
    remove_column :reviews, :item_id
    
    change_table :reviews do |t|
      t.references :item, polymorphic: true
    end
  end
end
