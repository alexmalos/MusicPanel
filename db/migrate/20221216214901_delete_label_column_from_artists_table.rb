class DeleteLabelColumnFromArtistsTable < ActiveRecord::Migration[5.2]
  def change
    remove_column :artists, :label
  end
end
