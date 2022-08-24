import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../page_not_found';
import ModalContainer from '../modal/modal_container';
import PersonIcon from '@mui/icons-material/Person';
import RatingStars from './rating_stars';
import LockIcon from '@mui/icons-material/Lock';
import OptionMenu from '../music/music_option_menu';

export default ({ reviewId, sessionId, openModal, fetchReview, modalType, entities }) => {
    const loggedIn = Boolean(sessionId);
    const [review, setReview] = useState(null);
    const [album, setAlbum] = useState(null);
    const [artist, setArtist] = useState(null);
    const [track, setTrack] = useState(null);
    const [pageNotFound, setPageNotFound] = useState(false);
    const [modal, setModal] = useState(null);
    const [user, setUser] = useState(null);

    const contentLoaded = () => {
        switch (review.itemType) {
            case 'Artist':
                return Boolean(artist);
            case 'Album':
                return (artist && album);
            case 'Track':
                return (artist && album && track)
            default:
                break;
        }
    };

    const isReview = () => {
        if (review.body || review.title) return true;
        else return false;
    };

    const reviewDateString = () => {
        const date = new Date(review.reviewDate.split('-'));
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const reviewInfo = () => {
        switch (review.itemType) {
            case 'Artist':
                return (
                    <div id='item-info'>
                        <Link to={`/artists/${artist.id}`} className='artist-image-link'>
                            <img src={artist.photoUrl} alt="" />
                            <div className='link-border'></div>
                        </Link>
                        <div id='info-text'>
                            <Link to={`/artists/${artist.id}`}>
                                {artist.name}
                            </Link>
                            <p>Artist</p>
                        </div>
                    </div>
                );
            case 'Album':
                return (
                    <div id='item-info'>
                        <Link to={`/albums/${album.id}`} className='album-cover-div'>
                            <img src={album.coverUrl} alt=""/>
                            <div className='cover-border' id="album-cover-border"></div>
                        </Link>
                        <div id='info-text'>
                            <Link to={`/albums/${album.id}`}>
                                {album.title}
                            </Link>
                            <div className='info-text-line'>
                                <p>{album.albumType}</p>
                                <div className='dot'></div>
                                <p>{album.releaseDate}</p>
                                <div className='dot'></div>
                                <p>{album.trackIds.length} Tracks</p>
                            </div>
                            <div className='artist-link'>
                                <Link to={`/artists/${artist.id}`} className='artist-image-link'>
                                    <img src={artist.photoUrl} alt="" />
                                    <div className='link-border'></div>
                                </Link>
                                <Link to={`/artists/${artist.id}`} id='artist-text-link'>
                                    {artist.name}
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            case 'Track':
                return (
                    <div id='item-info'>
                        <Link to={`/albums/${album.id}`} className='album-cover-div'>
                            <img src={album.coverUrl} alt=""/>
                            <div className='cover-border' id="album-cover-border"></div>
                        </Link>
                        <div id='info-text'>
                            <h2>{track.title}</h2>
                            <div className='info-text-line'>
                                <Link to={`/albums/${album.id}`}>
                                    {album.title}
                                </Link>
                                <div className='dot'></div>
                                <p>Track</p>
                                <div className='dot'></div>
                                <p>{album.releaseDate}</p>
                            </div>
                            <div className='artist-link'>
                                <Link to={`/artists/${artist.id}`} className='artist-image-link'>
                                    <img src={artist.photoUrl} alt="" />
                                    <div className='link-border'></div>
                                </Link>
                                <Link to={`/artists/${artist.id}`} id='artist-text-link'>
                                    {artist.name}
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            default:
                break;
        }
    }

    useEffect(() => {
        setReview(null);
        setAlbum(null);
        setArtist(null);
        setTrack(null);
        setUser(null);
        setPageNotFound(false);

        fetchReview(reviewId)
            .then(({ album, artist, track, review, user }) => {
                setReview(review);
                setAlbum(album);
                setArtist(artist);
                setTrack(track);
                setUser(user);
            }, () => setPageNotFound(true));
    }, [reviewId]);

    if (pageNotFound) return <PageNotFound />;
    else if (review && user && contentLoaded()) return (
        <div id='review-div'>
            <div className='background-div'>
                <div className='inner-background-div'>
                    <img src={review.itemType === 'Artist' ? artist.smallBackgroundUrl : album.smallBackgroundUrl} alt=""
                    className='small-background-image'/>
                    <img src={review.itemType === 'Artist' ? artist.backgroundUrl : album.backgroundUrl} alt="" />
                    <div className='background-overlay'></div>
                </div>
            </div>
            <div id='review-content'>
                {reviewInfo()}
                <div className='review-body'>
                    <div className='left-body-div'>
                        <div className='review-flex-div'>
                            <Link to={`/users/${user.id}`} className='profile-button'>
                                <PersonIcon />
                            </Link>
                            <div className='review-inner-content'>
                                <div className='review-info'>
                                    <p className='user-info'>
                                        {isReview() ? 'Review' : 'Rating'} by <Link to={`/users/${user.id}`}>{user.username}</Link>
                                    </p>
                                    <div className='rating-icons'>
                                        <RatingStars rating={review.rating} />
                                        {review.private ? <LockIcon className='lock-icon'/> : null}
                                    </div>
                                    <p className='review-date'>
                                        {isReview() ? 'Reviewed' : 'Rated'} on {reviewDateString()}
                                    </p>
                                </div>
                                {review.title ? <h4>{review.title}</h4> : null}
                                {review.body ? <p>{review.body}</p> : null}
                            </div>
                        </div>
                    </div>
                    <div className='right-body-div'>
                        {/* <OptionMenu
                            loggedIn={loggedIn}
                            openModal={openModal}
                            musicType='artist'
                            spotify={artist.spotify}
                        /> */}
                    </div>
                </div>
            </div>
        </div>
    );
    else return null;
};
