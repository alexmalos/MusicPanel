json.extract! list, :id, :pinned, :private, :title, :description, :author_id, :numbered

json.updateDate list.updated_at.to_date

json.timestamp list.updated_at.to_i

json.listItems list.list_items.map { |list_item| list_item.slice(:item_id, :item_type).transform_keys { |key| key.camelize(:lower) } }
