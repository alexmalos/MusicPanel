class DropNotNullConstraintFromWikiPathColumnInArtistsTable < ActiveRecord::Migration[5.2]
  def change
    change_column_null :artists, :wiki_path, true
  end
end
