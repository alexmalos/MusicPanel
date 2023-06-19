/* eslint-disable react/prop-types */
import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import RatingStars from "../reviews/rating_stars";

export default function MusicReviews ({ users }) {
    const { pageType, itemType, itemTitle, reviews } = useOutletContext();

    const reviewDateString = review => {
        const date = new Date(review.reviewDate.split('-'));
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const reviewDivClass = idx => {
        let classText = 'review-div';
        if (idx === 0) classText += ' first-review';
        if (idx === reviews.length - 1) classText += ' last-review';
        return classText;
    };
    
    return (
        <div className='music-reviews-body'>
            <div className='left-body-div'>
                <h4>{pageType} for {itemTitle}</h4>
                {
                    pageType === 'Reviews' ?
                        <div className="review-list">
                            {
                                reviews.length > 0 ?
                                    reviews.map((review, idx) => (
                                        <div className={reviewDivClass(idx)} key={review.id}>
                                            <Link to={`/reviews/${review.id}`} className='link-overlay'></Link>
                                            <div className="review-info">
                                                <Link to={`/users/${review.authorId}`} className='profile-button'>
                                                    <PersonIcon />
                                                </Link>
                                                <div className="review-info-text">
                                                    <h5>Review by <Link to={`/users/${review.authorId}`}>{users[review.authorId].username}</Link></h5>
                                                    <p>Reviewed on {reviewDateString(review)}</p>
                                                </div>
                                            </div>
                                            {review.title ? <h5 className="review-title">{review.title}</h5> : null}
                                            <RatingStars rating={review.rating}/>
                                            {
                                                review.body ?
                                                    <div className="review-text-div">
                                                        <p>{review.body}</p>
                                                    </div> : null
                                            }
                                        </div>
                                    )) :
                                    <p className="no-reviews">
                                        {itemType} has no {pageType[0].toLowerCase() + pageType.slice(1)} yet.
                                    </p>
                            }
                        </div> :
                        reviews.length > 0 ?
                            <div className="rating-grid">
                                {
                                    reviews.map(review => (
                                        <Link to={`/reviews/${review.id}`} className='rating-link' key={review.id}>
                                            <div className='profile-button'>
                                                <PersonIcon />
                                            </div>
                                            <h6>{users[review.authorId].username}</h6>
                                            <RatingStars rating={review.rating}/>
                                        </Link>
                                    ))
                                }
                            </div> :
                            <div className="review-list">
                                <p className="no-reviews">
                                    {itemType} has no {pageType[0].toLowerCase() + pageType.slice(1)} yet.
                                </p>
                            </div>
                }
            </div>
            <div className='right-body-div'>
                <div className="filter-div">
                    {/* <h4>Filters</h4> */}
                </div>
            </div>
        </div>
    );
}
