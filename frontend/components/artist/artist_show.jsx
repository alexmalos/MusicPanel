import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArtistHome from './artist_home';
import ArtistDiscography from './artist_discography';
import MusicReviewsContainer from '../music/music_reviews_container';
import RatingDiv from '../music/rating_div';
import parse from 'html-react-parser';
import ModalContainer from '../modal/modal_container';
import PageNotFound from '../page_not_found';

export default ({ artistId, path, sessionId, openModal, fetchArtist, modalType, entities }) => {
    const loggedIn = Boolean(sessionId);
    const [artist, setArtist] = useState(null);
    const [albums, setAlbums] = useState(null);
    const [artistBio, setArtistBio] = useState(null);
    const [pageNotFound, setPageNotFound] = useState(false);
    const [modal, setModal] = useState(null);
    const [userReview, setUserReview] = useState(null);
    const [reviews, setReviews] = useState(null);

    const atPath = pathEnd => {
        const regexPath = new RegExp(`/artists/${artistId}${pathEnd}/?$`);
        return regexPath.test(path);
    };

    const artistBody = () => {
        if (atPath('')) return (
            <ArtistHome
                albums={albums.slice(0, 8)}
                artist={artist}
                openModal={openModal}
                loggedIn={loggedIn}
            />
        );
        else if (atPath('/reviews')) return (
            <MusicReviewsContainer
                reviews={reviews.filter(review => review.body || review.title)}
                itemTitle={artist.name}
                itemType='Artist'
                pageType='Reviews'
            />
        );
        else if (atPath('/releases')) return (
            <ArtistDiscography
                albums={albums}
                artist={artist}
                loggedIn={loggedIn}
            />
        );
        else return null;
    };

    const processReviews = () => {
        const reviews = Object.values(entities.reviews);
        return reviews.filter(review => review.itemId === artistId && review.itemType === 'Artist');
    };

    useEffect(() => {
        setUserReview(findUserReview(entities.reviews));
        setArtist(entities.artists[artistId]);
        if (albums && reviews) {
            setAlbums(processAlbums(albums.map(album => entities.albums[album.id])));
            setReviews(processReviews());
        }
    }, [entities.reviews, sessionId]);

    const findUserReview = reviews => {
        const userReview = Object.values(reviews).find(review => (
            review.authorId === sessionId &&
            review.itemId === artistId &&
            review.itemType === 'Artist'
        ));
        return userReview ? userReview : null;
    };

    useEffect(() => {
        if (modalType === null) setModal(null);
    }, [modalType]);

    const renderModal = (modalType, itemId, itemType) => {
        openModal(modalType, true);
        if (modalType === 'artistBio') {
            setModal(
                <ModalContainer
                    artistBio={artistBio}
                    artistName={artist.name}
                    artistWikiPath={artist.wikiPath}
                />
            );
        } else {
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
        }
    };

    const processAlbums = albums => {
        const processedAlbums = Object.values(albums).map(album => {
            Object.freeze(album);
            const releaseDate = new Date(album.releaseDate.split('-'))
            return Object.assign({}, album, { releaseDate });
        });

        processedAlbums.sort((a, b) => {
            if (a.releaseDate < b.releaseDate) return 1;
            else return -1;
        });

        return processedAlbums;
    };

    useEffect(() => {
        setArtist(null);
        setAlbums(null);
        setReviews(null);
        setUserReview(null);
        setArtistBio(null);
        setPageNotFound(false);

        fetchArtist(artistId)
            .then(({ artist, albums, reviews }) => {
                setArtist(artist);
                setAlbums(processAlbums(albums));
                setReviews(Object.values(reviews));
                setUserReview(findUserReview(reviews));
            }, () => setPageNotFound(true));
    }, [artistId]);

    useEffect(() => {
        if (artist && artist.wikiPath) {
            $.ajax({
                url: `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro&origin=*&titles=${artist.wikiPath}`,
                method: 'GET'
            }).then(response => {
                const bioString = Object.values(response.query.pages)[0].extract;
                const bioElements = parse(bioString).filter(el => el.props && el.props.className !== 'mw-empty-elt');
                setArtistBio(bioElements);
            });
        }
    }, [artist]);

    if (pageNotFound) return <PageNotFound />;
    else if (artist && albums && reviews) return (
        <div>
            <div className='music-header'>
                <div className='header-content'>
                    <div className='background-div'>
                        <div className='inner-background-div'>
                            <img src={artist.smallBackgroundUrl} alt=""
                            className='small-background-image'/>
                            <img src={artist.backgroundUrl} alt="" />
                            <div className='background-overlay'></div>
                        </div>
                    </div>
                    <div className='header-info'>
                        <div className='music-div'>
                            <div className='artist-photo-div'>
                                <img src={artist.photoUrl} alt=""/>
                                <div className="photo-border"></div>
                            </div>
                            <div className='music-info'>
                                <h1>{artist.name}</h1>
                                {
                                    artistBio ?
                                        <div className='artist-bio-div'>
                                            {artistBio}
                                            <div className='artist-bio-fade'></div>
                                            <button onClick={() => renderModal('artistBio')}>
                                                Read more...
                                            </button>
                                        </div> : null
                                }
                            </div>
                        </div>
                        <RatingDiv
                            loggedIn={loggedIn}
                            openLoginModal={() => openModal('login')}
                            renderModal={() => renderModal(userReview ? (userReview.title || userReview.body ? 'editReview' : 'editRating') : 'newReview', artistId, 'Artist')}
                            itemType='Artist'
                            item={artist}
                            userRating={userReview ? userReview.rating : null}
                        />
                    </div>
                </div>
                <div className='header-tabs'>
                    <div className='tab-div'>
                        <Link to={`/artists/${artistId}`}
                            className={atPath('') ? '' : 'inactive'}>
                            Home
                        </Link>
                        <div className={atPath('') ? 'active' : '' }></div>
                    </div>
                    <div className='tab-div'>
                        <Link to={`/artists/${artistId}/reviews`}
                            className={atPath('/reviews') ? '' : 'inactive'}>
                            Reviews
                        </Link>
                        <div className={atPath('/reviews') ? 'active' : '' }></div>
                    </div>
                    <div className='tab-div'>
                        <Link to={`/artists/${artistId}/releases`}
                            className={atPath('/releases') ? '' : 'inactive'}>
                            Discography
                        </Link>
                        <div className={atPath('/releases') ? 'active' : '' }></div>
                    </div>
                </div>
            </div>
            {artistBody()}
            {modal}
        </div>
    );
    else return null;
};
