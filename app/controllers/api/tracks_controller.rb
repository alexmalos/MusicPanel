class Api::TracksController < ApplicationController
    def index
        @artists = Artist.all
        @albums = Album.all
        @tracks = Track.all
    end
    
    def show
        @track = Track.find(params[:id])
    end
end
