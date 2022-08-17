class ChangeArtistBirthYear < ActiveRecord::Migration[5.2]
  def change
    change_column :artists, :birth_year, :integer, using: 'birth_year::integer'
  end
end
