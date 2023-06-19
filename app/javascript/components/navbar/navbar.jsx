import React, { useState } from "react";
import { Link } from 'react-router-dom';
import SessionButtonsContainer from "./session_buttons_container";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import MusicDropdown from "./music_dropdown";
import MoreDropdown from "./more_dropdown";

export default () => {
  const [musicDropdownOpen, setMusicDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  return (
    <header>
      <div id="navbar-container">
        <div id="navbar">
          <Link to={"/"} id="logo"></Link>
          <div className="nav-button-div">
            <div className="music-button-div">
              <button id="music-dropdown-button" onClick={() => setMusicDropdownOpen(open => !open)}>Music</button>
              {musicDropdownOpen ? <MusicDropdown
              closeDropdown={() => setMusicDropdownOpen(false)}/> : null}
            </div>
            <Link to={"/reviews"} className='navbar-link'>Reviews</Link>
            <Link to={"/lists"} className='navbar-link'>Lists</Link>
            <div className="more-button-div">
              <button onClick={() => setMoreDropdownOpen(open => !open)} id="more-button">
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
