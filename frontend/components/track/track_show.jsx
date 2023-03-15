import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RatingDiv from '../music/rating_div';
import PageNotFound from '../page_not_found';
import ModalContainer from '../modal/modal_container';
import MusicReviewsContainer from '../music/music_reviews_container';

export default ({ trackId, path, sessionId, openModal, fetchTrack, modalType, entities }) => {
    const loggedIn = Boolean(sessionId);
    const [album, setAlbum] = useState(null);
    const [artist, setArtist] = useState(null);
    const [tracks, setTracks] = useState(null);
    const [track, setTrack] = useState(null);
    const [pageNotFound, setPageNotFound] = useState(false);
    const [modal, setModal] = useState(null);
    const [userReview, setUserReview] = useState(null);
    const [reviews, setReviews] = useState(null);

    const atPath = pathEnd => {
        const regexPath = new RegExp(`/tracks/${trackId}${pathEnd}/?$`);
        return regexPath.test(path);
    };

    const trackBody = () => {
        if (atPath('/reviews')) return (
            <MusicReviewsContainer
                reviews={reviews.filter(review => review.body || review.title)}
                itemTitle={track.title}
                itemType='Track'
                pageType='Reviews'
            />
        );
        else if (atPath('/ratings')) return (
            <MusicReviewsContainer
                reviews={reviews}
                itemTitle={track.title}
                itemType='Track'
                pageType='Ratings'
            />
        );
        else return null;
    };

    const processReviews = () => {
        const reviews = Object.values(entities.reviews);
        return reviews.filter(review => review.itemId === trackId && review.itemType === 'Track');
    };

    useEffect(() => {
        setUserReview(Object.values(entities.reviews).find(review => review.authorId));
        setTrack(entities.tracks[trackId]);
        if (artist && album && tracks && reviews) {
            setArtist(entities.artists[track.artistId]);
            setAlbum(entities.albums[track.albumId]);
            setTracks(tracks.map(track => entities.tracks[track.id]));
            setReviews(processReviews());
        }
    }, [entities.reviews, sessionId]);

    const findUserReview = reviews => {
        const userReview = Object.values(reviews).find(review => (
            review.authorId === sessionId &&
            review.itemId === trackId &&
            review.itemType === 'Track'
        ));
        return userReview ? userReview : null;
    };

    useEffect(() => {
        if (!['editReview', 'editRating', 'newReview'].includes(modalType)) setModal(null);
    }, [modalType]);

    const renderModal = (modalType, itemId, itemType) => {
        openModal(modalType, true);
        if (userReview) {
            setModal(
                <ModalContainer
                    authorId={sessionId}
                    itemId={itemId}
                    itemType={itemType}
                    review={userReview}
                />
            );
        } else {
            setModal(
                <ModalContainer
                    authorId={sessionId}
                    itemId={itemId}
                    itemType={itemType}
                />
            );
        }
    };

    useEffect(() => {
        setAlbum(null);
        setArtist(null);
        setTracks(null);
        setTrack(null);
        setReviews(null);
        setUserReview(null);
        setPageNotFound(false);

        fetchTrack(trackId)
            .then(({ album, artist, tracks, reviews }) => {
                setAlbum(album);
                setArtist(artist);
                setTracks(Object.values(tracks));
                setTrack(Object.values(tracks).find(track => track.id === trackId));
                setReviews(Object.values(reviews));
                setUserReview(findUserReview(reviews));
            }, () => setPageNotFound(true));
    }, [trackId]);

    if (pageNotFound) return <PageNotFound />;
    else if (album && artist && tracks && track && reviews) return (
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
                                openLoginModal={() => openModal('login')}
                                renderModal={() => renderModal(userReview ? (userReview.title || userReview.body ? 'editReview' : 'editRating') : 'newReview', trackId, 'Track')}
                                itemType='Track'
                                item={track}
                                userRating={userReview ? userReview.rating : null}
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
            {modal}
        </div>
    );
    else return null;
};
