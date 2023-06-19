import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import OptionPopup from "../music/option_popup";

export default function DiscographyGrid ({ albums, loggedIn }) {
    const [optionPopupOpen, setOptionPopupOpen] = useState(false);
    const [clickedAlbumButton, setClickedAlbumButton] = useState(null);

    const handleOptionClick = e => {
        setOptionPopupOpen(true);
        setClickedAlbumButton(e.currentTarget);
    };

    useEffect(() => {
        if (optionPopupOpen) {
            const optionPopup = document.getElementById('option-popup');
            if (optionPopup.offsetHeight > clickedAlbumButton.getBoundingClientRect().top - 12) {
                optionPopup.classList.add('popup-below');
            } else optionPopup.classList.add('popup-above');
            optionPopup.classList.remove('hidden');
        }
    }, [optionPopupOpen]);

    return (
        <div className='discography-grid'>
            {
                albums.map(album => (
                    <div className='album-div' key={album.id}>
                        <div className='album-cover-div'>
                            <Link className='album-cover-link' to={`/albums/${album.id}`}>
                                <img src={album.coverUrl} alt="" />
                                <div className='album-cover-border'></div>
                            </Link>
                            {/* {
                                loggedIn ?
                                    <div className='album-options-div'>
                                        <button className='album-options-button'
                                        album-id={album.id}
                                        onClick={handleOptionClick}>
                                            <MoreHorizRoundedIcon />
                                            <p className='text-popup'>Show Menu</p>
                                        </button>
                                        {
                                            (optionPopupOpen && parseInt(clickedAlbumButton.getAttribute('album-id')) === album.id) ?
                                                <OptionPopup
                                                    closeOptionPopup={() => setOptionPopupOpen(false)}
                                                    optionType='album'
                                                    musicLink={`/albums/${album.id}`}
                                                /> : null
                                        }
                                    </div> :
                                    null
                            } */}
                        </div>
                        <Link className='album-info-link' to={`/albums/${album.id}`}>
                            <h6>{album.title}</h6>
                            <p className='album-info'>{album.albumType} • {album.releaseDate.getFullYear()}</p>
                        </Link>
                    </div>
                ))
            }
        </div>
    );
}
