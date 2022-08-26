import React, { useState } from "react";
import { Link } from 'react-router-dom';
import SessionButtonsContainer from "./session_buttons_container";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import MusicDropdown from "./music_dropdown";

export default () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const musicClick = () => {
      if (!dropdownOpen) setDropdownOpen(true);
  };

  return (
    <header>
      <div id="navbar-container">
        <div id="navbar">
          <Link to={"/"} id="logo"></Link>
          <div className="nav-button-div">
            <div className="music-button-div">
              <button onClick={musicClick}>Music</button>
              {dropdownOpen ? <MusicDropdown
              closeDropdown={() => setDropdownOpen(false)}/> : null}
            </div>
            <Link to={"/reviews"}>Reviews</Link>
            {/* <Link to={"/lists"}>Lists</Link>
            <button id="more-button">
              <MoreHorizRoundedIcon />
            </button> */}
          </div>
          <SessionButtonsContainer />
        </div>
      </div>
    </header>
  );
};
