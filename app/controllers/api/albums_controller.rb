class Api::AlbumsController < ApplicationController
    def index
        @albums = Album.all
        @artists = Artist.all
    end

    def show
        @album = Album.find(params[:id])
    end
end
