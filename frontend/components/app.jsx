import React from "react";
import { Link } from 'react-router-dom';
// import { AuthRoute } from "../util/route_util";
import ModalContainer from "./modal/modal_container";
import SessionButtonsContainer from "./session_buttons/session_buttons_container";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

export default () => (
  <div>
    <header>
      <div id="navbar">
        <Link to={"/"} id="logo"></Link>
        <div className="navButtonDiv">
          <button>Music</button>
          <button>Reviews</button>
          <button>Lists</button>
          <button id="moreButton">
            <MoreHorizRoundedIcon />
          </button>
        </div>
        <SessionButtonsContainer />
      </div>
    </header>
    <ModalContainer />
  </div>
);
