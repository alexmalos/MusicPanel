import React, { useState, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import StarIcon from '@mui/icons-material/Star';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import OptionPopup from './option_popup';
import OptionMenu from '../music/option_menu';

export default props => {
    const { album, loggedIn } = props;

    const [tracklistExpanded, setTracklistExpanded] = useState(false);
    const [tracks, setTracks] = useState(props.tracks.slice(0, 7));
    const [optionPopupOpen, setOptionPopupOpen] = useState(false);
    const [clickedTrackId, setClickedTrackId] = useState(null);

    let expandableTracklist;
    if (props.tracks.length > 7) expandableTracklist = true;
    else expandableTracklist = false;

    const toggleTracklist = () => {
        setTracklistExpanded(!tracklistExpanded);
        if (props.tracks.length > tracks.length) setTracks(props.tracks);
        else setTracks(props.tracks.slice(0, 7));
    };

    const albumReleaseDateString = () => {
        const date = new Date(album.releaseDate.split('-'));
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const handleOptionClick = e => {
        setOptionPopupOpen(true);
        setClickedTrackId(parseInt(e.currentTarget.getAttribute('track-id')));
    }

    useEffect(() => {
        if (optionPopupOpen) {
            const optionPopup = document.getElementById('option-popup');
            const trackDiv = [...document.getElementsByClassName('track-div')]
                .find(el => parseInt(el.getAttribute('track-id')) === clickedTrackId);
            if (optionPopup.offsetHeight > trackDiv.getBoundingClientRect().top - 4) {
                optionPopup.classList.add('popup-below');
            } else optionPopup.classList.add('popup-above');
            optionPopup.classList.remove('hidden');
        }
    }, [optionPopupOpen]);

    return (
        <div className='album-body'>
            <div className='left-body-div'>
                {
                    expandableTracklist ?
                        <button className='header-button' onClick={toggleTracklist}>
                            <span>Tracklist</span>
                            {
                                tracklistExpanded ?
                                    <ExpandLessIcon className='up-arrow' /> :
                                    <ExpandMoreIcon className='down-arrow'/>
                            }
                        </button> :
                        <h4>Tracklist</h4>
                }
                
                <div className='tracklist'>
                    {
                        tracks.map(track => (
                            <div className='track-div' key={track.id} track-id={track.id}>
                                <p className='track-number'>{track.trackNumber}</p>
                                <p className='track-title'>{track.title}</p>
                                {
                                    loggedIn ?
                                        <div className='track-options-div'>
                                            <button className='track-options-button'
                                            track-id={track.id}
                                            onClick={handleOptionClick}>
                                                <MoreHorizRoundedIcon />
                                                <p className='text-popup'>Show Menu</p>
                                            </button>
                                            {
                                                (optionPopupOpen && clickedTrackId === track.id) ?
                                                    <OptionPopup
                                                        track={track}
                                                        closeOptionPopup={() => setOptionPopupOpen(false)}
                                                    /> : null
                                            }
                                        </div> :
                                        null
                                }
                                <button className='track-rating-button'>
                                    <StarIcon />
                                    <span>0<span> / 5</span></span>
                                    <p className='text-popup'>Rate this track</p>
                                </button>
                            </div>
                        ))
                    }
                    {
                        tracklistExpanded ? null :
                            <button className='expand-overlay' onClick={toggleTracklist}>
                                <p className='text-popup'>Show full tracklist</p>
                            </button>
                    }
                </div>
            </div>
            <div className='right-body-div'>
                <OptionMenu loggedIn={loggedIn} openLoginModal={props.openLoginModal} />
                <h4>Information</h4>
                <div className='info-div'>
                    <div className='info-element first-element'>
                        <h5>Release Date</h5>
                        <p>{albumReleaseDateString()}</p>
                    </div>
                    <div className='info-element'>
                        <h5>Duration</h5>
                        <p>{album.duration}</p>
                    </div>
                    <div className='info-element'>
                        <h5>Label</h5>
                        <p>{album.label}</p>
                    </div>
                    <div className='info-element'>
                        <h5>Explict Lyrics</h5>
                        <p>{album.explicit ? 'Yes' : 'No'}</p>
                    </div>
                    <div className='info-element'>
                        <h5>Genres</h5>
                        <p>{album.genres.join(', ')}</p>
                    </div>
                    </div>
            </div>
        </div>
    );
};
