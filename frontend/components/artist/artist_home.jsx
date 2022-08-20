import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import OptionMenu from '../music/option_menu';
import OptionPopup from '../music/option_popup';

export default ({ artist, albums, loggedIn, openLoginModal }) => {
    const [optionPopupOpen, setOptionPopupOpen] = useState(false);
    const [clickedAlbumButton, setClickedAlbumButton] = useState(null);

    const artistBirthdayString = () => {
        const date = new Date(artist.birthday.split('-'));
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const artistSocials = () => {
        if (artist.twitter && artist.instagram)
            return <p><a href={artist.twitter} target='_blank'>Twitter</a>
                    , <a href={artist.instagram} target='_blank'>Instagram</a></p>;
        else if (artist.twitter)
            return <a href={artist.twitter} target='_blank'>Twitter</a>;
        else return <a href={artist.instagram} target='_blank'>Instagram</a>;
    };

    const handleOptionClick = e => {
        setOptionPopupOpen(true);
        setClickedAlbumButton(e.currentTarget);
    }

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
        <div className='artist-body'>
            <div className='left-body-div'>
                <Link to={`/artists/${artist.id}/releases`} className='header-button'>
                    <span>Discography</span>
                    <ChevronRightIcon className='right-arrow' />
                </Link>
                <div className='discography-grid'>
                    {
                        albums.map(album => (
                            <div className='album-div' key={album.id}>
                                <div className='album-cover-div'>
                                    <Link className='album-cover-link' to={`/albums/${album.id}`}>
                                        <img src={album.coverUrl} alt="" />
                                        <div className='album-cover-border'></div>
                                    </Link>
                                    {
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
                                    }
                                </div>
                                <Link className='album-info-link' to={`/albums/${album.id}`}>
                                    <h6>{album.title}</h6>
                                    <p className='album-info'>{album.albumType} • {album.releaseDate.getFullYear()}</p>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='right-body-div'>
                <OptionMenu
                    loggedIn={loggedIn}
                    openLoginModal={openLoginModal}
                    musicType='artist'
                />
                <h4>Information</h4>
                <div className='info-div'>
                    {
                        artist.formed ?
                            <div className='info-element first-element'>
                                <h5>Formed</h5>
                                <p>{artist.formed}</p>
                            </div> : null
                    }
                    {
                        artist.members.length > 0 ?
                            <div className='info-element'>
                                <h5>Members</h5>
                                <p>{artist.members.join(', ')}</p>
                            </div> : null
                    }
                    {
                        artist.birthday ?
                            <div className='info-element first-element'>
                                <h5>Born</h5>
                                <p>{artistBirthdayString()}</p>
                            </div> : null
                    }
                    <div className='info-element'>
                        <h5>Label</h5>
                        <p>{artist.label}</p>
                    </div>
                    <div className='info-element'>
                        <h5>Origin</h5>
                        <p>{artist.origin}</p>
                    </div>
                    {
                        artist.website ?
                            <div className='info-element'>
                                <h5>Website</h5>
                                <a href={artist.website} target='_blank'>{artist.website.slice(12)}</a>
                            </div> : null
                    }
                    {
                        artist.twitter || artist.instagram ?
                            <div className='info-element'>
                                <h5>Socials</h5>
                                {artistSocials()}
                            </div> : null
                    }
                </div>
            </div>
        </div>
    );
};
