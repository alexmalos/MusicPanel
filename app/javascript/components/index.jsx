import React from "react";
import { createRoot } from "react-dom/client";
import Root from "./root";
import configureStore from "../store/store";

document.addEventListener("turbo:load", () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser },
      },
      session: { id: window.currentUser.id },
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  const root = createRoot(
    document.body.appendChild(document.createElement("div"))
  );
  root.render(<Root store={store} />);
});
