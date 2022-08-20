import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import StarIcon from '@mui/icons-material/Star';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

export default props => {
    const { artist, loggedIn } = props;

    const [albums, setAlbums] = useState(props.albums.slice(0, 8));

    const artistBirthdayString = () => {
        const date = new Date(artist.birthday.split('-'));
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

   return (
        <div className='artist-body'>
            {/* <div className='left-body-div'>
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
                        albums.map(album => (
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
                </div>
            </div>
            <div className='right-body-div'>
                <div className='option-menu'>
                    {
                        loggedIn ?
                            [
                                <button key={1}>Write Review</button>,
                                <button key={2}>Add to Listen Later</button>,
                                <button key={3}>Add album to a list</button>
                            ] :
                            <button onClick={props.openLoginModal}>Sign in for more options</button>
                    }
                    <a href='https://open.spotify.com/album/7D2NdGvBHIavgLhmcwhluK' target='_blank'>
                        Listen on Spotify
                    </a>
                </div>
                <h4>Information</h4>
                <div className='info-div'>
                    <div className='info-element first-element'>
                        <h5>Release Date</h5>
                        <p>{artistBirthdayString()}</p>
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
            </div> */}
        </div>
    );
};
