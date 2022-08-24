import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import RatingStars from "../reviews/rating_stars";
import ExplicitIcon from '@mui/icons-material/Explicit';

const ReviewIndex = ({ fetchReviews }) => {
    const [state, setState] = useState(null);

    useEffect(() => {
        fetchReviews().then(data => setState(data));
    }, []);

    const reviewDivClass = idx => {
        let classText = 'review-div';
        if (idx === 0) classText += ' first-review';
        if (idx === Object.keys(state.reviews).length - 1) classText += ' last-review';
        return classText;
    };

    const reviewItemInfo = review => {
        switch (review.itemType) {
            case 'Artist':
                return (
                    <div className="review-item-info">
                        <Link to={`/artists/${review.itemId}`} className='artist-image-link'>
                            <img src={state.artists[review.itemId].photoUrl} alt="" />
                            <div className='link-border'></div>
                        </Link>
                        <div className="review-info-text">
                            <Link className='item-link' to={`/artists/${review.itemId}`}>{state.artists[review.itemId].name}</Link>
                            <p>Artist</p>
                        </div>
                    </div>
                );
            case 'Album':
                return (
                    <div className="review-item-info">
                        <Link to={`/albums/${review.itemId}`} className='album-cover-div'>
                            <img src={state.albums[review.itemId].coverUrl} alt=""/>
                            <div className='cover-border' id="album-cover-border"></div>
                        </Link>
                        <div className="review-info-text">
                            <div className="album-link-div">
                                <Link className="item-link" to={`/albums/${review.itemId}`}>{state.albums[review.itemId].title}</Link>
                                {
                                    state.albums[review.itemId].explicit ?
                                        <ExplicitIcon /> : null
                                }
                            </div>
                            <p className="artist-info-text">
                                <Link to={`/artists/${state.albums[review.itemId].artistId}`}>{state.artists[state.albums[review.itemId].artistId].name}</Link> • {state.albums[review.itemId].albumType}
                            </p>
                        </div>
                    </div>
                );
            case 'Track':
                return (
                    <div className="review-item-info">
                        <Link to={`/albums/${state.tracks[review.itemId].albumId}`} className='album-cover-div'>
                            <img src={state.albums[state.tracks[review.itemId].albumId].coverUrl} alt=""/>
                            <div className='cover-border' id="album-cover-border"></div>
                        </Link>
                        <div className="review-info-text">
                            <Link className="item-link" to={`/albums/${state.tracks[review.itemId].albumId}`}>{state.tracks[review.itemId].title}</Link>
                            <p className="artist-info-text">
                                <Link to={`/artists/${state.tracks[review.itemId].artistId}`}>{state.artists[state.tracks[review.itemId].artistId].name}</Link> • Track
                            </p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };
    
    if (state) return (
        <div className='music-reviews-body'>
            <div className='left-body-div'>
                <h4>All Reviews</h4>
                <div className="review-list">
                    {
                        Object.values(state.reviews).map((review, idx) => (
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
                                <div className="reviewer-info">
                                    <Link to={`/users/${review.authorId}`} className='profile-button'>
                                        <PersonIcon />
                                    </Link>
                                    <Link to={`/users/${review.authorId}`} className='reviewer-username'>{state.users[review.authorId].username}</Link>
                                </div>
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
    );
};

import { connect } from 'react-redux';
import { fetchReviews } from "../../actions/review_actions";

const mapDispatchToProps = dispatch => ({
    fetchReviews: () => dispatch(fetchReviews())
});

export default connect(null, mapDispatchToProps)(ReviewIndex);
