import React from "react";
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import RatingStars from "../reviews/rating_stars";

export default ({ reviews, itemTitle, itemType, users }) => {
    const reviewDateString = review => {
        const date = new Date(review.reviewDate.split('-'));
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };
    
    return (
        <div className='music-reviews-body'>
            <div className='left-body-div'>
                <h4>Reviews for {itemTitle}</h4>
                <div className='review-list'>
                    {
                        reviews.length > 0 ?
                            reviews.map(review => (
                                <div className='review-div' key={review.id}>
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
                                    <h5 className="review-title">{review.title}</h5>
                                    <RatingStars rating={review.rating}/>
                                    <div className="review-text-div">
                                        <p>{review.body}</p>
                                    </div>
                                </div>
                            )) :
                            <p className="no-reviews">
                                {itemType} has no reviews yet.
                            </p>
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