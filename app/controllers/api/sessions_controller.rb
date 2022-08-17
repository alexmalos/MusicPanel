class Api::SessionsController < ApplicationController
    def create
        username = params[:user][:username]
        password = params[:user][:password]

        @user = User.find_by_credentials(username, password)
    
        if username == '' || password == ''
          render json: ["Both fields have to be filled."], status: 401
        elsif @user
          login!(@user)
          render "api/users/show"
        else
          render json: ["Unable to login with provided credentials."], status: 401
        end
    end
    
    def destroy
        @user = current_user
        if @user
          logout!
          render "api/users/show"
        else
          render json: ["Nobody signed in"], status: 404
        end
    end
end
