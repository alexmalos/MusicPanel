import React from "react";
import { Link } from 'react-router-dom';
// import { AuthRoute } from "../util/route_util";
import ModalContainer from "./modal/modal_container";
import SessionButtonsContainer from "./session_buttons/session_buttons_container";

export default () => (
  <div>
    <header>
      <div id="navbar">
        <Link to={"/"} id="logo"></Link>
        <SessionButtonsContainer />
      </div>
    </header>
    <ModalContainer />
  </div>
);
