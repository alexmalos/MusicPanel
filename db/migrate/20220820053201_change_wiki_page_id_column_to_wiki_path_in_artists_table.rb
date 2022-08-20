class ChangeWikiPageIdColumnToWikiPathInArtistsTable < ActiveRecord::Migration[5.2]
  def change
    remove_column :artists, :wiki_page_id
    add_column :artists, :wiki_path, :string, null: false
  end
end
