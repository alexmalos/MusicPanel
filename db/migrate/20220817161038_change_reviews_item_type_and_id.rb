class ChangeReviewsItemTypeAndId < ActiveRecord::Migration[5.2]
  def change
    change_column :reviews, :item_id, :integer
    change_column_null :reviews, :item_id, false
    change_column_null :reviews, :item_type, false
  end
end
