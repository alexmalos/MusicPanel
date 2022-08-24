class Api::ReviewsController < ApplicationController
    before_action :require_logged_in, only: [:create, :update, :destroy]

    def index
        @reviews = Review.full_reviews
        @artists = reviews_items(@reviews, 'Artist')
        @albums = reviews_items(@reviews, 'Album')
        @tracks = reviews_items(@reviews, 'Track')
        @users = reviews_users(@reviews)
    end

    def show
        @review = Review.find(params[:id])
    end

    def create
        @review = Review.new(review_params)
        @review.nilify_blanks
        render "/api/reviews/show" if @review.save!
    end

    def update
        @review = Review.find(params[:id])
        if @review.update(review_params)
            @review.nilify_blanks
            @review.save!
            render "/api/reviews/show"
        end
    end

    def destroy
        @review = Review.find(params[:id])
        @review.destroy
        render "/api/reviews/show"
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

    def reviews_items(reviews, item_type)
        type_reviews = reviews.select { |review| review.item_type == item_type }
        type_reviews.map { |review| review.item }
    end

    def reviews_users(reviews)
        unique_reviews = reviews.uniq { |review| review.author_id }
        unique_reviews.map { |review| review.author }
    end
end
