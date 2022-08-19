import React from "react";
import { Link } from 'react-router-dom';
import SessionButtonsContainer from "./session_buttons_container";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

export default () => (
    <header>
      <div id="navbar-container">
        <div id="navbar">
          <Link to={"/"} id="logo"></Link>
          <div className="nav-button-div">
            <button>Music</button>
            <Link to={"/reviews"}>Reviews</Link>
            <Link to={"/lists"}>Lists</Link>
            <button id="more-button">
              <MoreHorizRoundedIcon />
            </button>
          </div>
          <SessionButtonsContainer />
        </div>
      </div>
    </header>
);