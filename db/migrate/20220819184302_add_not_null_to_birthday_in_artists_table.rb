class AddNotNullToBirthdayInArtistsTable < ActiveRecord::Migration[5.2]
  def change
    change_column_null :artists, :birthday, false
  end
end
