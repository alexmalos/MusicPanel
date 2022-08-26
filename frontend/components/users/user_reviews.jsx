import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageNotFound from "../page_not_found";
import RatingStars from "../reviews/rating_stars";
import LockIcon from '@mui/icons-material/Lock';
import ExplicitIcon from '@mui/icons-material/Explicit';

export default ({ sessionId, userId, fetchUser, entities, processForm }) => {
    const [user, setUser] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [pageNotFound, setPageNotFound] = useState(false);

    const reviewDivClass = idx => {
        let classText = 'review-div';
        if (idx === 0) classText += ' first-review';
        if (idx === Object.keys(reviews).length - 1) classText += ' last-review';
        return classText;
    };

    const fullReviews = () => {
        if (sessionId === userId) {
            return reviews.filter(review => review.title || review.body);
        } else {
            return reviews.filter(review => (review.title || review.body) && !review.private);
        }
    };

    useEffect(() => {
        setUser(null);
        setReviews(null);
        setPageNotFound(false);

        fetchUser(userId).then(({ user, reviews }) => {
            setUser(user);
            if (reviews) setReviews(Object.values(reviews));
            else reviews = [];
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

    // const [state, setState] = useState({ name: '', biography: '' });
    // const [profilePhoto, setProfilePhoto] = useState(null);

    // const handleSubmit = e => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append('user[name]', state.name);
    //     formData.append('user[biography]', state.biography);
    //     formData.append('user[profile_photo]', profilePhoto.file)
    //     processForm(user.id, formData);
    // };

    // const update = field => e => (
    //     setState(Object.assign({}, state, { [field]: e.target.value }))
    // );

    // const handleFile = e => {
    //     const file = e.currentTarget.files[0];
    //     const fileReader = new FileReader();
    //     fileReader.onloadend = () => {

    //         setProfilePhoto({ file, url: fileReader.result })
    //     };
    //     if (file) fileReader.readAsDataURL(file);
    // };
    
    // return (
    //     <div className="settings-page">
    //         <h4>Profile</h4>
    //         <form id="profile-form" onSubmit={handleSubmit}>
    //             <input type="file" onChange={handleFile}/>
    //             <div className="form-input-div">
    //                 <label className="form-text" htmlFor="name-input">Name</label>
    //                 <input
    //                     className="form-input"
    //                     id="name-input"
    //                     type="text"
    //                     value={state.name}
    //                     onChange={update('name')}
    //                 />
    //             </div>
    //             <div className="form-input-div form-section">
    //                 <label className="form-text" htmlFor="biography-input">Biography</label>
    //                 <textarea
    //                     className="form-input"
    //                     id="biography-input"
    //                     value={state.biography}
    //                     onChange={update('biography')}
    //                 />
    //             </div>
    //             <button className="submit" type="submit">Save</button>
    //         </form>
    //     </div>
    // );

    if (pageNotFound) return <PageNotFound />;
    else if (user && reviews) return (
        <div>
            <div className="music-reviews-body">
                <div className='left-body-div'>
                    <h4>Reviews by <Link className="user-reviews-profile-link" to={`/users/${user.id}`}>{user.username}</Link></h4>
                    <div className="review-list">
                        {
                            reviews.length > 0 ?
                            fullReviews().map((review, idx) => (
                                <div className={reviewDivClass(idx)} key={review.id}>
                                    <Link to={`/reviews/${review.id}`} className='link-overlay'></Link>
                                    {reviewItemInfo(review)}
                                    {review.title ? <h5 className="review-title">{review.title}</h5> : null}
                                    <div className='user-rating-icons'>
                                        <RatingStars id={review.title ? null : 'rating-stars-top'} rating={review.rating} />
                                        {review.private ? <LockIcon className='lock-icon'/> : null}
                                    </div>
                                    {/* <RatingStars id={review.title ? null : 'rating-stars-top'} rating={review.rating}/> */}
                                    {
                                        review.body ?
                                            <div className="review-text-div" id="review-index-text-div">
                                                <p>{review.body}</p>
                                            </div> : null
                                    }
                                </div>
                            )) :
                            <p className="no-reviews">
                                {user.username} has no reviews yet.
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
        </div>
    );
};
