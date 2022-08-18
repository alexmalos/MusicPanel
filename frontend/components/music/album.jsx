import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import LockIcon from '@mui/icons-material/Lock';

export default props => {
    const history = useHistory();

    const [album, setAlbum] = useState(props.entities.albums[props.albumId]);
    const [artist, setArtist] = useState(null);
    const [tracks, setTracks] = useState(null);
    const [requestedTracks, setRequestedTracks] = useState(false);

    const atPath = pathEnd => {
        const regexPath = new RegExp(`/albums/${props.albumId}${pathEnd}/?$`);
        return regexPath.test(props.path);
    };

    useEffect(() => {
        console.log('effect')
        if (album && props.albumId !== album.id) {
            setAlbum(props.entities.albums[props.albumId]);
            setArtist(null);
            setTracks(null);
            setRequestedTracks(false);
        }

    }, [props.path]);
    
    useEffect(() => {
        if (!tracks && !requestedTracks) {
            props.fetchTracks(props.albumId)
                .then(({ tracks }) => setTracks(tracks));
            setRequestedTracks(true);
        }
    
        if (!album) {
            props.fetchAlbum(props.albumId)
                .then(({ album }) => setAlbum(album), () => history.replace("/"));
        } else {
            const loadedArtist = props.entities.artists[album.artistId];
    
            if (loadedArtist) setArtist(loadedArtist);
            else {
                props.fetchArtist(album.artistId)
                    .then(({ artist }) => setArtist(artist));
            }
        }
    }, [album]);

    return (album && artist && tracks) ? (
        <div>
            <div className='album-header'>
                <div className='header-content'>
                    <div className='background-div'>
                        <div className='inner-background-div'>
                            <img src={album.smallBackgroundUrl} alt=""
                            className='small-background-image'/>
                            <img src={album.backgroundUrl} alt="" />
                            <div className='background-overlay'></div>
                        </div>
                    </div>
                    <div className='header-info'>
                        <div className='album-div'>
                            <img src={album.coverUrl} alt="" className='album-cover'/>
                            <div className='album-info'>
                                <h1>{album.title}</h1>
                                <div className='album-details'>
                                    <p>{album.albumType}</p>
                                    <div className='dot'></div>
                                    <p>{album.releaseDate}</p>
                                    <div className='dot'></div>
                                    <p>{album.trackIds.length} Tracks</p>
                                </div>
                                <div className='artist-link'>
                                    <Link to={`/artists/${album.artistId}`} id='artist-image-link'>
                                        <img src={artist.photoUrl} alt="" />
                                        <div id='link-border'></div>
                                    </Link>
                                    <Link to={`/artists/${album.artistId}`} id='artist-text-link'>
                                        {artist.name}
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='rating-div'>
                            <div className='rating-info'>
                                <div className='info-div'>
                                    <div className='inner-info-div'>
                                        <h3>0</h3>
                                        <p>Total ratings</p>
                                    </div>
                                </div>
                                <div className='info-div'>
                                    <div className='divider'></div>
                                    <div className='inner-info-div'>
                                        <div className='star-div'>
                                            <StarIcon />
                                            <h3>0
                                                <span> / 5</span>
                                            </h3>
                                        </div>
                                        <p>Average rating</p>
                                    </div>
                                </div>
                                <div className='info-div'>
                                    <div className='divider'></div>
                                    <div className='inner-info-div'>
                                        <div className='star-div'>
                                            <StarIcon />
                                            <h3>0
                                                <span> / 5</span>
                                            </h3>
                                        </div>
                                        <p>Your rating</p>
                                    </div>
                                </div>
                            </div>
                            {
                                props.loggedIn ?
                                    <button>
                                        <StarIcon />
                                        Rate Album
                                    </button> :
                                    <button>
                                        <LockIcon />
                                        Sign in to rate this album
                                    </button>
                            }
                        </div>
                    </div>
                </div>
                <div className='header-tabs'>
                    <div className='tab-div'>
                        <Link to={`/albums/${props.albumId}`} className={atPath('') ? '' : 'inactive'}>Home</Link>
                        <div className={atPath('') ? 'active' : '' }></div>
                    </div>
                    <div className='tab-div'>
                        <Link to={`/albums/${props.albumId}/reviews`} className={atPath('/reviews') ? '' : 'inactive'}>Reviews</Link>
                        <div className={atPath('/reviews') ? 'active' : '' }></div>
                    </div>
                    <div className='tab-div'>
                        <Link to={`/albums/${props.albumId}/ratings`} className={atPath('/ratings') ? '' : 'inactive'}>Ratings</Link>
                        <div className={atPath('/ratings') ? 'active' : '' }></div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};
