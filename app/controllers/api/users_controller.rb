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
          render "api/users/show"
        else
          render json: ["Username is not available."], status: 422
        end
    end
    
    private
    
    def user_params
        params.require(:user).permit(:username, :password)
    end
end
