class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)

        username = params[:user][:username]
        password = params[:user][:password]
    
        if username == '' || password == ''
          render json: ["Both fields have to be filled."], status: 422
        elsif username.match(/\s/)
          render json: ["Username cannot contain any whitespace."], status: 422
        elsif username.length < 3
          render json: ["Username has to be at least 3 characters."], status: 422
        elsif password.length < 8
          render json: ["Password has to be at least 8 characters."], status: 422
        elsif @user.save
          login!(@user)
          render "api/users/user"
        else
          render json: ["Username is not available."], status: 422
        end
    end

    def show
      @user = User.find(params[:id])
      @reviews = @user.reviews
      @artists = reviews_items(@reviews, 'Artist')
      @albums = reviews_items(@reviews, 'Album')
      @tracks = reviews_items(@reviews, 'Track')
    end

    def update
      @user = User.find(params[:id])
      if @user.update(update_params)
          @user.nilify_blanks
          @user.save!
          render "/api/users/show"
      end
    end
    
    private
    
    def user_params
        params.require(:user).permit(:username, :password)
    end

    def update_params
        params.require(:user).permit(:name, :biography, :profile_photo)
    end

    def reviews_items(reviews, item_type)
        type_reviews = reviews.select { |review| review.item_type == item_type }
        type_reviews.map { |review| review.item }
    end
end
