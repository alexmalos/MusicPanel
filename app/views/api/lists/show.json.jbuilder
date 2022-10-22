json.list do
    json.partial! "api/lists/list", list: @list
end

json.user do
    json.partial! "api/users/user", user: @list.author
end

json.listItems do 
    json.array! @list.list_items do |list_item|
        json.extract! list_item, :item_id, :order_number, :item_type, :list_id, :id
    end
end

json.artists do
    @list.list_items.each do |list_item|
        if list_item.item_type == 'Artist'
            artist = list_item.item
        else
            artist = list_item.item.artist
        end

        json.set! artist.id do
            json.partial! "api/artists/artist", artist: artist
        end
    end
end

if @albums.empty? && @tracks.empty?
    json.albums({})
else
    json.albums do
        @list.list_items.each do |list_item|
            case list_item.item_type
            when 'Album'
                album = list_item.item
            when 'Track'
                album = list_item.item.album
            else
                next
            end

            json.set! album.id do
                json.partial! "api/albums/album", album: album
            end
        end
    end
end

if @tracks.empty?
    json.tracks({})
else
    json.tracks do
        @tracks.each do |track|
            json.set! track.id do
                json.partial! "api/tracks/track", track: track
            end
        end
    end
end
