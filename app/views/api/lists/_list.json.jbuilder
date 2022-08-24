json.extract! list, :id, :pinned, :private, :title, :description, :author_id, :numbered

json.updateDate list.updated_at.to_date
