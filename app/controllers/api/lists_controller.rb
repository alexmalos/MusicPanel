class Api::ListsController < ApplicationController
    before_action :require_logged_in, only: [:create, :update, :destroy]

    def index
        @lists = List.all
        @artists = lists_items(@lists, 'Artist')
        @albums = lists_items(@lists, 'Album')
        @tracks = lists_items(@lists, 'Track')
        @users = lists_users(@lists)
    end

    def show
        @list = List.find(params[:id])
        @artists = @list.items('Artist')
        @albums = @list.items('Album')
        @tracks = @list.items('Track')
    end

    def create
        @list = List.new(list_params)
        @list.nilify_blank_description
        @artists = @list.items('Artist')
        @albums = @list.items('Album')
        @tracks = @list.items('Track')
        render "/api/lists/show" if @list.save!
    end

    def update
        @list = List.find(params[:id])
        if @list.update(list_params)
            @list.nilify_blank_description
            @list.save!
            @artists = @list.items('Artist')
            @albums = @list.items('Album')
            @tracks = @list.items('Track')
            render "/api/lists/show"
        end
    end

    def destroy
        @list = List.find(params[:id])
        @artists = @list.items('Artist')
        @albums = @list.items('Album')
        @tracks = @list.items('Track')
        @list.destroy
        render "/api/lists/show"
    end
    
    private
    
    def list_params
        params.require(:list).permit(
            :pinned,
            :private,
            :numbered,
            :title,
            :description,
            :author_id
        )
    end

    def lists_items(lists, item_type)
        lists.map { |list| list.items(item_type) }.flatten.uniq
    end

    def lists_users(lists)
        unique_lists = lists.uniq { |list| list.author_id }
        unique_lists.map { |list| list.author }
    end
end
