class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
    
        if @user.save
          login!(@user)
          render "api/users/show"
        elsif params[:user][:username] == '' || params[:user][:password] == ''
          render json: ["Both fields have to be filled."], status: 422
        elsif params[:user][:username].length < 3
          render json: ["Username has to be at least 3 characters."], status: 422
        elsif params[:user][:password].length < 8
          render json: ["Password has to be at least 8 characters."], status: 422
        else
          render json: @user.errors.full_messages, status: 422
        end
    end
    
    private
    
    def user_params
        params.require(:user).permit(:username, :password)
    end
end
