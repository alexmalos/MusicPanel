class Api::SongsController < ApplicationController
    def index
        @songs = Album.find(params[:album_id]).track_ids.map { |track_id| Song.find(track_id) }
    end

    def show
        @song = Song.find(params[:id])
    end
end
