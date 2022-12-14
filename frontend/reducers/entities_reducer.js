import { combineReducers } from "redux";
import users from "./users_reducer";
import lists from "./lists_reducer";
import { artists, albums, tracks } from "./music_reducer";
import reviews from "./reviews_reducer";

export default combineReducers({
  users,
  artists,
  albums,
  tracks,
  reviews,
  lists
});
