class Api::ListItemsController < ApplicationController
    before_action :require_logged_in

    def create
        @lists = []

        params[:list_ids].each do |list_id|
            list = List.find(list_id)
            ListItem.create(
                list_id: list_id,
                item_type: params[:item_type].capitalize,
                item_id: params[:item_id],
                order_number: list.list_items.size
            )
            @lists << list
        end
        
        @artists = lists_items(@lists, 'Artist')
        @albums = lists_items(@lists, 'Album')
        @tracks = lists_items(@lists, 'Track')
        @users = lists_users(@lists)
        render "/api/lists/index"
    end

    def list_item_params(item)
        item.permit(:id, :list_id, :order_number, :item_type, :item_id)
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
