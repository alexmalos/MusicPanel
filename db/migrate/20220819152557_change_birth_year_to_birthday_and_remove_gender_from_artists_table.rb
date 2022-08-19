class ChangeBirthYearToBirthdayAndRemoveGenderFromArtistsTable < ActiveRecord::Migration[5.2]
  def change
    remove_column :artists, :gender
    remove_column :artists, :birth_year
    add_column :artists, :birthday, :date
  end
end
