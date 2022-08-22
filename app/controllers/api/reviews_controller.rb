class Api::ReviewsController < ApplicationController
    before_action :require_logged_in, only: [:create, :update, :destroy]

    def index

    end

    def show
        @review = Review.find(params[:id])
    end

    def create
        @review = Review.new(review_params)
        render "/api/reviews/show" if @review.save!
    end

    def update
        @review = Review.find(params[:id])
        @review.update(review_params)
    end

    def destroy
        review = Review.find(params[:id])
        review.destroy
    end
    
    private
    
    def review_params
        params.require(:review).permit(
            :rating,
            :pinned,
            :private,
            :title,
            :body,
            :author_id,
            :item_type,
            :item_id
        )
    end
end
