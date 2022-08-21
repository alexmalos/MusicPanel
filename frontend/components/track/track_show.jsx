import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RatingDiv from '../music/rating_div';
import PageNotFound from '../page_not_found';

export default ({ trackId, path, loggedIn, openLoginModal, fetchTrack }) => {
    const [album, setAlbum] = useState(null);
    const [artist, setArtist] = useState(null);
    const [tracks, setTracks] = useState(null);
    const [track, setTrack] = useState(null);
    const [pageNotFound, setPageNotFound] = useState(false);

    const atPath = pathEnd => {
        const regexPath = new RegExp(`/tracks/${trackId}${pathEnd}/?$`);
        return regexPath.test(path);
    };

    const trackBody = () => {
        // if (atPath('')) return <AlbumHome
        //                             tracks={tracks}
        //                             album={album}
        //                             artist={artist}
        //                             openLoginModal={openLoginModal}
        //                             loggedIn={loggedIn}
        //                         />
        // else return null;
        return null;
    }

    useEffect(() => {
        setAlbum(null);
        setArtist(null);
        setTracks(null);
        setTrack(null);
        setPageNotFound(false);

        fetchTrack(trackId)
            .then(({ album, artist, tracks }) => {
                setAlbum(album);
                setArtist(artist);
                setTracks(tracks);
                setTrack(tracks.find(track => track.id === trackId))
            }, () => setPageNotFound(true));
    }, [trackId]);

    if (pageNotFound) return <PageNotFound />;
    else if (album && artist && tracks && track) return (
        <div>
            <div className='music-header'>
                <div className='header-content'>
                    <div className='track-header-info'>
                        <Link to={`/albums/${album.id}`} id='track-back-link'>
                            <p>Go Back to Album</p>
                        </Link>
                        <div className='header-info' id='track-header-info'>
                            <div className='music-div'>
                                <Link to={`/albums/${album.id}`} className='album-cover-div'>
                                    <img src={album.coverUrl} alt=""/>
                                    <div className='cover-border' id="album-cover-border"></div>
                                </Link>
                                <div className='music-info'>
                                    <h1>{track.title}</h1>
                                    <Link to={`/albums/${album.id}`} id='album-title-link'>{album.title}</Link>
                                    <div className='artist-link'>
                                        <Link to={`/artists/${artist.id}`} id='artist-image-link'>
                                            <img src={artist.photoUrl} alt="" />
                                            <div id='link-border'></div>
                                        </Link>
                                        <Link to={`/artists/${artist.id}`} id='artist-text-link'>
                                            {artist.name}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <RatingDiv
                                loggedIn={loggedIn}
                                openLoginModal={openLoginModal}
                                musicType='track'
                            />
                        </div>
                    </div>
                </div>
                <div className='header-tabs'>
                    <div className='tab-div'>
                        <Link to={`/tracks/${trackId}/reviews`}
                            className={atPath('/reviews') ? '' : 'inactive'}>
                            Reviews
                        </Link>
                        <div className={atPath('/reviews') ? 'active' : '' }></div>
                    </div>
                    <div className='tab-div'>
                        <Link to={`/tracks/${trackId}/ratings`}
                            className={atPath('/ratings') ? '' : 'inactive'}>
                            Ratings
                        </Link>
                        <div className={atPath('/ratings') ? 'active' : '' }></div>
                    </div>
                </div>
            </div>
            {trackBody()}
        </div>
    );
    else return null;
};
