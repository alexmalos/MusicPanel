import React, { useState } from "react";
import { Link } from 'react-router-dom';
import SessionButtonsContainer from "./session_buttons_container";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import MusicDropdown from "./music_dropdown";
import MoreDropdown from "./more_dropdown";

export default () => {
  const [musicDropdownOpen, setMusicDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const musicClick = () => {
      if (!musicDropdownOpen) setMusicDropdownOpen(true);
  };

  const moreClick = () => {
      if (!moreDropdownOpen) setMoreDropdownOpen(true);
  };

  return (
    <header>
      <div id="navbar-container">
        <div id="navbar">
          <Link to={"/"} id="logo"></Link>
          <div className="nav-button-div">
            <div className="music-button-div">
              <button onClick={musicClick}>Music</button>
              {musicDropdownOpen ? <MusicDropdown
              closeDropdown={() => setMusicDropdownOpen(false)}/> : null}
            </div>
            <Link to={"/reviews"}>Reviews</Link>
            <Link to={"/lists"}>Lists</Link>
            <div className="more-button-div">
              <button onClick={moreClick} id="more-button">
                <MoreHorizRoundedIcon />
              </button>
              {moreDropdownOpen ? <MoreDropdown
              closeDropdown={() => setMoreDropdownOpen(false)}/> : null}
            </div>
          </div>
          <SessionButtonsContainer />
        </div>
      </div>
    </header>
  );
};
