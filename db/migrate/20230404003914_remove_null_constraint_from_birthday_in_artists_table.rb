class RemoveNullConstraintFromBirthdayInArtistsTable < ActiveRecord::Migration[7.0]
  def change
    change_column_null :artists, :birthday, true
  end
end
