import { combineReducers } from "redux";
import users from "./users_reducer";
import { artists, albums, songs } from "./music_reducer";
import reviews from "./reviews_reducer";

export default combineReducers({
  users,
  artists,
  albums,
  songs,
  reviews
});
