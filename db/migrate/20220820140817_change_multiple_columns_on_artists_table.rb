class ChangeMultipleColumnsOnArtistsTable < ActiveRecord::Migration[5.2]
  def change
    add_column :artists, :twitter, :string
    add_column :artists, :instagram, :string
    add_column :artists, :members, :string, array: true, default: []
    add_column :artists, :formed, :integer
    change_column_null :artists, :website, true
    change_column_null :artists, :birthday, true
    change_column_null :artists, :wiki_path, false
  end
end
