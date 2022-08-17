class Api::SongsController < ApplicationController
    def show
        @song = Song.find(params[:id])
    end
end
