import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import OptionMenu from '../music/music_option_menu_container';
import DiscographyGrid from './discography_grid';

export default function ArtistHome () {
    const { artist, albums, loggedIn } = useOutletContext();
    
    const artistBirthdayString = () => {
        const date = new Date(...(artist.birthday.split('-')));
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const artistSocials = () => {
        if (artist.twitter && artist.instagram)
            return <p><a href={`https://twitter.com/${artist.twitter}`} target='_blank' rel="noreferrer">Twitter</a>
                    , <a href={`https://www.instagram.com/${artist.instagram}`} target='_blank' rel="noreferrer">Instagram</a></p>;
        else if (artist.twitter)
            return <a href={`https://twitter.com/${artist.twitter}`} target='_blank' rel="noreferrer">Twitter</a>;
        else return <a href={`https://www.instagram.com/${artist.instagram}`} target='_blank' rel="noreferrer">Instagram</a>;
    };

    return (
        <div className='artist-body'>
            <div className='left-body-div'>
                <Link to={`/artists/${artist.id}/releases`} className='header-button'>
                    <span>Discography</span>
                    <ChevronRightIcon className='right-arrow' />
                </Link>
                <DiscographyGrid albums={albums} loggedIn={loggedIn} />
            </div>
            <div className='right-body-div'>
                <OptionMenu
                    loggedIn={loggedIn}
                    musicType='artist'
                    item={artist}
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
                        <h5>Origin</h5>
                        <p>{artist.origin}</p>
                    </div>
                    {
                        artist.website ?
                            <div className='info-element'>
                                <h5>Website</h5>
                                <a href={artist.website} target='_blank' rel="noreferrer">{
                                artist.website.includes("www.") ? artist.website.slice(artist.website.indexOf("www.") + 4) : artist.website.slice(artist.website.indexOf("://") + 3)
                                }</a>
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
}
