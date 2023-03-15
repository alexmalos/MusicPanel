class AddCollaboratorsColumnToAlbumsTable < ActiveRecord::Migration[5.2]
  def change
    add_column :albums, :collaborators, :string, array: true, default: []
  end
end
