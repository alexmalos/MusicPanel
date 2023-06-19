/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation, Outlet } from 'react-router-dom';
import RatingDiv from '../music/rating_div';
import parse from 'html-react-parser';
import ModalContainer from '../modal/modal_container';
import PageNotFound from '../page_not_found';

export default function ArtistShow ({ sessionId, openModal, fetchArtist, modalType, entities }) {
    const loggedIn = Boolean(sessionId);
    const [artist, setArtist] = useState(null);
    const [albums, setAlbums] = useState(null);
    const [artistBio, setArtistBio] = useState(null);
    const [pageNotFound, setPageNotFound] = useState(false);
    const [modal, setModal] = useState(null);
    const [userReview, setUserReview] = useState(null);
    const [reviews, setReviews] = useState(null);
    const params = useParams();
    const artistId = parseInt(params.artistId);
    const location = useLocation();
    const path = location.pathname;

    const atPath = pathEnd => {
        const regexPath = new RegExp(`/artists/${artistId}${pathEnd}/?$`);
        return regexPath.test(path);
    };

    const outletContext = () => {
        if (atPath('')) return ({
                artist,
                loggedIn,
                albums: albums.slice(0, 8)
        });
        else if (atPath('/reviews')) return ({
                reviews: reviews.filter(review => review.body || review.title),
                itemTitle: artist.name,
                itemType: 'Artist',
                pageType: 'Reviews'
        });
        else if (atPath('/releases')) return ({
                albums,
                artist,
                loggedIn
        });
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
        if (!['editReview', 'editRating', 'newReview', 'artistBio'].includes(modalType)) setModal(null);
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
            axios.get(
              `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro&origin=*&titles=${artist.wikiPath}`
            )
              .then(response => response.data)
              .then(response => {
                const bioString = Object.values(response.query.pages)[0]
                  .extract;
                let bioElements = parse(bioString);
                if (Array.isArray(bioElements))
                  bioElements = bioElements.filter(
                    el => el.props && el.props.className !== "mw-empty-elt"
                  );
                setArtistBio(bioElements);
              })
              .catch(error => console.error(error));

        }
    }, [artist]);

    if (pageNotFound) return <PageNotFound />;
    else if (artist && albums && reviews) return (
      <div>
        <div className="music-header">
          <div className="header-content">
            <div className="background-div">
              <div className="inner-background-div">
                <img
                  src={artist.smallBackgroundUrl}
                  alt=""
                  className="small-background-image"
                />
                <img src={artist.backgroundUrl} alt="" />
                <div className="background-overlay"></div>
              </div>
            </div>
            <div className="header-info">
              <div className="music-div">
                <div className="artist-photo-div">
                  <img src={artist.photoUrl} alt="" />
                  <div className="photo-border"></div>
                </div>
                <div className="music-info">
                  <h1>{artist.name}</h1>
                  {artistBio ? (
                    <div className="artist-bio-div">
                      {artistBio}
                      <div className="artist-bio-fade"></div>
                      <button onClick={() => renderModal("artistBio")}>
                        Read more...
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
              <RatingDiv
                loggedIn={loggedIn}
                openLoginModal={() => openModal("login")}
                renderModal={() =>
                  renderModal(
                    userReview
                      ? userReview.title || userReview.body
                        ? "editReview"
                        : "editRating"
                      : "newReview",
                    artistId,
                    "Artist"
                  )
                }
                itemType="Artist"
                item={artist}
                userRating={userReview ? userReview.rating : null}
              />
            </div>
          </div>
          <div className="header-tabs">
            <div className="tab-div">
              <Link
                to={`/artists/${artistId}`}
                className={atPath("") ? "" : "inactive"}
              >
                Home
              </Link>
              <div className={atPath("") ? "active" : ""}></div>
            </div>
            <div className="tab-div">
              <Link
                to={`/artists/${artistId}/reviews`}
                className={atPath("/reviews") ? "" : "inactive"}
              >
                Reviews
              </Link>
              <div className={atPath("/reviews") ? "active" : ""}></div>
            </div>
            <div className="tab-div">
              <Link
                to={`/artists/${artistId}/releases`}
                className={atPath("/releases") ? "" : "inactive"}
              >
                Discography
              </Link>
              <div className={atPath("/releases") ? "active" : ""}></div>
            </div>
          </div>
        </div>
        <Outlet context={outletContext()} />
        {modal}
      </div>
    );
    else return null;
}
