import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageNotFound from "../page_not_found";
import PersonIcon from '@mui/icons-material/Person';
import RatingStars from "../reviews/rating_stars";
import ExplicitIcon from '@mui/icons-material/Explicit';

export default ({ sessionId, userId, fetchUser, entities }) => {
    const [user, setUser] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [pageNotFound, setPageNotFound] = useState(false);

    const reviewDivClass = idx => {
        let classText = 'review-div';
        if (idx === 0) classText += ' first-review';
        if (idx === Object.keys(reviews).length - 1) classText += ' last-review';
        return classText;
    };

    const pinnedReviews = () => {
        if (sessionId === userId) {
            return reviews.filter(review => (review.title || review.body) && review.pinned);
        } else {
            return reviews.filter(review => (review.title || review.body) && review.pinned && !review.private);
        }
    };

    const fullReviews = () => reviews.filter(review => review.title || review.body);

    useEffect(() => {
        setUser(null);
        setReviews(null);
        setPageNotFound(false);

        fetchUser(userId).then(({ user, reviews }) => {
            setUser(user);
            if (reviews) setReviews(Object.values(reviews));
            else setReviews([]);
        }, () => setPageNotFound(true));
    }, [userId]);

    const reviewItemInfo = review => {
        switch (review.itemType) {
            case 'Artist':
                return (
                    <div className="review-item-info">
                        <Link to={`/artists/${review.itemId}`} className='artist-image-link'>
                            <img src={entities.artists[review.itemId].photoUrl} alt="" />
                            <div className='link-border'></div>
                        </Link>
                        <div className="review-info-text">
                            <Link className='item-link' to={`/artists/${review.itemId}`}>{entities.artists[review.itemId].name}</Link>
                            <p>Artist</p>
                        </div>
                    </div>
                );
            case 'Album':
                return (
                    <div className="review-item-info">
                        <Link to={`/albums/${review.itemId}`} className='album-cover-div'>
                            <img src={entities.albums[review.itemId].coverUrl} alt=""/>
                            <div className='cover-border' id="album-cover-border"></div>
                        </Link>
                        <div className="review-info-text">
                            <div className="album-link-div">
                                <Link className="item-link" to={`/albums/${review.itemId}`}>{entities.albums[review.itemId].title}</Link>
                                {
                                    entities.albums[review.itemId].explicit ?
                                        <ExplicitIcon /> : null
                                }
                            </div>
                            <p className="artist-info-text">
                                <Link to={`/artists/${entities.albums[review.itemId].artistId}`}>{entities.artists[entities.albums[review.itemId].artistId].name}</Link> • {entities.albums[review.itemId].albumType}
                            </p>
                        </div>
                    </div>
                );
            case 'Track':
                return (
                    <div className="review-item-info">
                        <Link to={`/albums/${entities.tracks[review.itemId].albumId}`} className='album-cover-div'>
                            <img src={entities.albums[entities.tracks[review.itemId].albumId].coverUrl} alt=""/>
                            <div className='cover-border' id="album-cover-border"></div>
                        </Link>
                        <div className="review-info-text">
                            <Link className="item-link" to={`/albums/${entities.tracks[review.itemId].albumId}`}>{entities.tracks[review.itemId].title}</Link>
                            <p className="artist-info-text">
                                <Link to={`/artists/${entities.tracks[review.itemId].artistId}`}>{entities.artists[entities.tracks[review.itemId].artistId].name}</Link> • Track
                            </p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };
    
    if (pageNotFound) return <PageNotFound />;
    else if (user && reviews) return (
        <div>
            <div className='user-header'>
                <div className='header-content'>
                    <div className='header-info'>
                        <div className='header-flex'>
                            <div className="user-div">
                                <div className='profile-pic'>
                                    <PersonIcon />
                                </div>
                                <div className='user-info'>
                                    <h5 className={user.name ? '' : 'zeropacity'}>{user.username}</h5>
                                    <h1>{user.name ? user.name : user.username}</h1>
                                    <p>{user.biography}</p>
                                </div>
                            </div>
                            <div className="review-numbers-div">
                                <div className='rating-info'>
                                    <div className='info-link'>
                                        <div className='inner-info-div'>
                                            <h3>{fullReviews().length}</h3>
                                            <p>Review{fullReviews().length !== 1 ? 's' : null}</p>
                                        </div>
                                    </div>
                                    <div className='info-link'>
                                        <div className='divider'></div>
                                        <div className='inner-info-div'>
                                            <h3>{reviews.length}</h3>
                                            <p>Rating{reviews.length !== 1 ? 's' : null}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* {sessionId === userId ? <Link className="button">Edit Profile</Link> : null} */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='header-tabs'>
                    <div className='tab-div'>
                        <Link to={`/users/${userId}`}>Home</Link>
                        <div className='active'></div>
                    </div>
                    <div className='tab-div'>
                        <Link to={`/users/${userId}/reviews`} className='inactive'>
                            Collection
                        </Link>
                    </div>
                </div>
            </div>
            <div className="music-reviews-body">
                <div className='left-body-div'>
                    <h4>Pinned</h4>
                    <div className="review-list">
                        {
                            pinnedReviews().map((review, idx) => (
                                <div className={reviewDivClass(idx)} key={review.id}>
                                    <Link to={`/reviews/${review.id}`} className='link-overlay'></Link>
                                    {reviewItemInfo(review)}
                                    {review.title ? <h5 className="review-title">{review.title}</h5> : null}
                                    <RatingStars id={review.title ? null : 'rating-stars-top'} rating={review.rating}/>
                                    {
                                        review.body ?
                                            <div className="review-text-div" id="review-index-text-div">
                                                <p>{review.body}</p>
                                            </div> : null
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='right-body-div'>
                    <div className="filter-div">
                        {/* <h4>Filters</h4> */}
                    </div>
                </div>
            </div>
        </div>
    );
};
