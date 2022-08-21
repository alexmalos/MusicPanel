import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RatingDiv from '../music/rating_div';
import AlbumHome from './album_home';
import PageNotFound from '../page_not_found';

export default ({ albumId, path, loggedIn, openLoginModal, fetchAlbum }) => {
    const [album, setAlbum] = useState(null);
    const [artist, setArtist] = useState(null);
    const [tracks, setTracks] = useState(null);
    const [pageNotFound, setPageNotFound] = useState(false);
    
    const atPath = pathEnd => {
        const regexPath = new RegExp(`/albums/${albumId}${pathEnd}/?$`);
        return regexPath.test(path);
    };

    const albumBody = () => {
        if (atPath('')) return <AlbumHome
                                    tracks={tracks}
                                    album={album}
                                    artist={artist}
                                    openLoginModal={openLoginModal}
                                    loggedIn={loggedIn}
                                />
        else return null;
    }

    useEffect(() => {
        setAlbum(null);
        setArtist(null);
        setTracks(null);
        setPageNotFound(false);

        fetchAlbum(albumId)
            .then(({ album, artist, tracks }) => {
                setAlbum(album);
                setArtist(artist);
                setTracks(tracks);
            }, () => setPageNotFound(true));

        console.log(queryParams());
    }, [albumId]);

    if (pageNotFound) return <PageNotFound />;
    else if (album && artist && tracks) return (
        <div>
            <div className='music-header'>
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
                        <div className='music-div'>
                            <div className='album-cover-div'>
                                <img src={album.coverUrl} alt=""/>
                                <div className="cover-border"></div>
                            </div>
                            <div className='music-info'>
                                <h1>{album.title}</h1>
                                <div className='album-details'>
                                    <p>{album.albumType}</p>
                                    <div className='dot'></div>
                                    <p>{album.releaseDate}</p>
                                    <div className='dot'></div>
                                    <p>{tracks.length} Tracks</p>
                                </div>
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
                            musicType='album'
                        />
                    </div>
                </div>
                <div className='header-tabs'>
                    <div className='tab-div'>
                        <Link to={`/albums/${albumId}`}
                            className={atPath('') ? '' : 'inactive'}>
                            Home
                        </Link>
                        <div className={atPath('') ? 'active' : '' }></div>
                    </div>
                    <div className='tab-div'>
                        <Link to={`/albums/${albumId}/reviews`}
                            className={atPath('/reviews') ? '' : 'inactive'}>
                            Reviews
                        </Link>
                        <div className={atPath('/reviews') ? 'active' : '' }></div>
                    </div>
                    <div className='tab-div'>
                        <Link to={`/albums/${albumId}/ratings`}
                            className={atPath('/ratings') ? '' : 'inactive'}>
                            Ratings
                        </Link>
                        <div className={atPath('/ratings') ? 'active' : '' }></div>
                    </div>
                </div>
            </div>
            {albumBody()}
        </div>
    );
    else return null;
};
