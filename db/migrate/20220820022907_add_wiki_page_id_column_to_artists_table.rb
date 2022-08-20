class AddWikiPageIdColumnToArtistsTable < ActiveRecord::Migration[5.2]
  def change
    add_column :artists, :wiki_page_id, :integer, null: false
  end
end
