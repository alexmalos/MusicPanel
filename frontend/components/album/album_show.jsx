import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RatingDiv from '../music/rating_div';
import AlbumHome from './album_home';
import PageNotFound from '../page_not_found';
import ModalContainer from '../modal/modal_container';
import MusicReviewsContainer from '../music/music_reviews_container';

export default ({ albumId, path, sessionId, openModal, fetchAlbum, modalType, entities }) => {

    const [album, setAlbum] = useState(null);
    const [artist, setArtist] = useState(null);
    const [tracks, setTracks] = useState(null);
    const [pageNotFound, setPageNotFound] = useState(false);
    const [modal, setModal] = useState(null);
    const [userReview, setUserReview] = useState(null);
    const [reviews, setReviews] = useState(null);
    
    const atPath = pathEnd => {
        const regexPath = new RegExp(`/albums/${albumId}${pathEnd}/?$`);
        return regexPath.test(path);
    };

    const albumBody = () => {
        if (atPath('')) return (
            <AlbumHome
                tracks={tracks}
                album={album}
                artist={artist}
                openModal={openModal}
                sessionId={sessionId}
                reviews={Object.values(entities.reviews)}
                renderModal={(trackId, userReview) => renderModal(trackId, 'Track', userReview)}
            />
        );
        else if (atPath('/reviews')) return (
            <MusicReviewsContainer
                reviews={reviews.filter(review => review.body || review.title)}
                itemTitle={album.title}
                itemType='Album'
                pageType='Reviews'
            />
        );
        else if (atPath('/ratings')) return (
            <MusicReviewsContainer
                reviews={reviews}
                itemTitle={album.title}
                itemType='Album'
                pageType='Ratings'
            />
        );
        else return null;
    };

    useEffect(() => {
        if (modalType === null) setModal(null);
    }, [modalType]);

    const renderModal = (itemId, itemType, userReview) => {
        if (userReview) {
            openModal('editReview', true);
            setModal(
                <ModalContainer
                    authorId={sessionId}
                    itemId={itemId}
                    itemType={itemType}
                    review={userReview}
                />
            );
        } else {
            openModal('newReview', true);
            setModal(
                <ModalContainer
                    authorId={sessionId}
                    itemId={itemId}
                    itemType={itemType}
                />
            );
        }
    };

    const processReviews = () => {
        const reviews = Object.values(entities.reviews);
        return reviews.filter(review => review.itemId === albumId && review.itemType === 'Album');
    };

    useEffect(() => {
        setUserReview(findUserReview(entities.reviews));
        setAlbum(entities.albums[albumId]);
        if (artist && tracks && reviews) {
            setArtist(entities.artists[album.artistId]);
            setTracks(tracks.map(track => entities.tracks[track.id]));
            setReviews(processReviews());
        }
    }, [entities.reviews, sessionId]);

    const findUserReview = reviews => {
        const userReview = Object.values(reviews).find(review => (
            review.authorId === sessionId &&
            review.itemId === albumId &&
            review.itemType === 'Album'
        ));
        return userReview ? userReview : null;
    };

    useEffect(() => {
        setAlbum(null);
        setArtist(null);
        setTracks(null);
        setReviews(null);
        setUserReview(null);
        setPageNotFound(false);

        fetchAlbum(albumId)
            .then(({ album, artist, tracks, reviews }) => {
                setAlbum(album);
                setArtist(artist);
                setTracks(Object.values(tracks));
                setReviews(Object.values(reviews));
                setUserReview(findUserReview(reviews));
            }, () => setPageNotFound(true));
    }, [albumId]);

    if (pageNotFound) return <PageNotFound />;
    else if (album && artist && tracks && reviews) return (
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
                            loggedIn={Boolean(sessionId)}
                            openLoginModal={() => openModal('login')}
                            renderModal={() => renderModal(albumId, 'Album', userReview)}
                            itemType='Album'
                            item={album}
                            userRating={userReview ? userReview.rating : null}
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
            {modal}
        </div>
    );
    else return null;
};
