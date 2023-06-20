import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "../reducers/root_reducer";

const middleware = [thunk];

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== "production") {
  console.log(process.env.NODE_ENV);
  console.log(typeof process.env.NODE_ENV);
  middleware.push(logger);
}

export default function storeConfig (preloadedState = {}) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware
  });
}