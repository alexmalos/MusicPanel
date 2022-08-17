import { combineReducers } from "redux";
import users from "./users_reducer";
import { artists, albums, songs } from "./music_reducer";

export default combineReducers({
  users,
  artists,
  albums,
  songs
});
