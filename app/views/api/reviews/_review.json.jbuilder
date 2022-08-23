json.extract! review, :id, :rating, :pinned, :private, :title, :body, :author_id, :item_type, :item_id

json.reviewDate review.updated_at.to_date