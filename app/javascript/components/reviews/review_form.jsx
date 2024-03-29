/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ExplicitIcon from '@mui/icons-material/Explicit';
import CheckIcon from '@mui/icons-material/Check';
import RatingStars from "./rating_stars";

export default function ReviewForm (props) {
    const { authorId, itemType, itemId, entities, formType, closeModalConfirm, openAlert } = props;
    const pathname = useLocation().pathname;
    
    let item;
    switch (itemType) {
        case 'Artist':
            item = entities.artists[itemId];
            break;
        case 'Album':
            item = entities.albums[itemId];
            break;
        case 'Track':
            item = entities.tracks[itemId];
            break;
        default:
            break;
    }

    let album;
    switch (itemType) {
        case 'Album':
            album = item;
            break;
        case 'Track':
            album = entities.albums[item.albumId];
            break;
        default:
            break;
    }

    let artist = entities.artists[item.artistId];

    const deleteReview = e => {
        e.preventDefault();
        closeModalConfirm(null);
        props.deleteReview(state.id);
    };

    const processReview = review => {
        Object.freeze(review);
        const newReview = Object.assign({}, review);
        Object.keys(newReview).forEach(key => {
            if (newReview[key] === null) newReview[key] = '';
        });
        return newReview;
    };
    
    const [state, setState] = useState(processReview(props.review));
    const [isReview, setIsReview] = useState(false);

    useEffect(() => {
        const review = processReview(props.review);
        // console.log([review, state]);
        if (state.title === '' && state.body === '') {
            setIsReview(false);
            if (formType && (state.title !== review.title || state.body !== review.body)) {
                closeModalConfirm("Are you sure you want to discard this review? All changes will be lost.");
            }
            else closeModalConfirm(null);
        } else {
            setIsReview(true);
            if (formType && (state.title === review.title || state.body === review.body)) {
                closeModalConfirm(null);
            }
            else closeModalConfirm("Are you sure you want to discard this review? All changes will be lost.");
        }
    }, [state.title, state.body, props.review, formType, closeModalConfirm])

    const submitText = () => {
        if (parseInt(state.rating) === 0) return 'Missing Rating';
        if (formType === 'editReview') {
            if (isReview) return 'Update Review';
            else return 'Review needed';
        } else if (formType === 'editRating') {
            if (isReview) return 'Post Review';
            else return 'Update Rating'
        } else {
            if (isReview) return 'Post Review';
            else return `Rate ${itemType}`;
        }
    };

    const updateRating = rating => e => {
        e.preventDefault();
        setState(Object.assign({}, state, { rating }))
    };

    const handleSubmit = e => {
        e.preventDefault();
        const review = Object.assign({}, state, {
            author_id: authorId,
            item_type: itemType,
            item_id: itemId
        });
        closeModalConfirm(null);
        props.processForm(review);
        if (formType && !pathname.includes(review.id)) {
            openAlert({
                review,
                alertType: isReview ? 'editReview' : 'editRating',
                fired: false
            });
        }
    };

    const update = field => e => {
        if (field === 'pinned' || field === 'private') {
            setState(Object.assign({}, state, { [field]: e.target.checked }));
        } else setState(Object.assign({}, state, { [field]: e.target.value }));
    };

    return (
        <form id="review-form" onSubmit={handleSubmit}>
            {
                itemType === 'Artist' ?
                    <div className='image-div artist-photo-div'>
                        <img src={item.photoUrl} alt=""/>
                        <div className="border"></div>
                    </div> :
                    <div className='image-div album-cover-div'>
                        <img src={album.coverUrl} alt=""/>
                        <div className="border"></div>
                    </div>
            }
            <div className="form-content-div">
                <div className="title-div">
                    <h3>{itemType === 'Artist' ? item.name : item.title}</h3>
                    {
                        itemType === 'Album' && item.explicit ?
                            <ExplicitIcon /> : null
                    }
                </div>
                <p className="item-info">{itemType === 'Artist' ? null : `${artist.name} • `}{itemType}</p>
                <div className="rating-options-div">
                    <div>
                        <div className="rating-div">
                            <div className="rating-info">
                                <h5>Rating</h5>
                                <p>{state.rating / 2} of 5</p>
                            </div>
                            <RatingStars
                                rating={state.rating}
                                updateRating={updateRating}
                            />
                        </div>
                    </div>
                    <div className="checkbox-div">
                        <h5>Private</h5>
                        <input
                            id="private-input"
                            type="checkbox"
                            checked={state.private}
                            onChange={update('private')}
                        />
                        <label htmlFor="private-input">
                            <span className="checkbox-span">
                                <CheckIcon />
                            </span>
                            <span className="checkbox-text">
                                Private {isReview ? 'review' : 'rating'}
                            </span>
                        </label>
                    </div>
                    <div className="checkbox-div">
                        <h5>Pinned</h5>
                        <input
                            disabled={!isReview}
                            id="pinned-input"
                            type="checkbox"
                            checked={isReview ? state.pinned : false}
                            onChange={update('pinned')}
                        />
                        <label htmlFor="pinned-input">
                            <span className="checkbox-span">
                                <CheckIcon />
                            </span>
                            <span className="checkbox-text">
                                {isReview ? 'Pin to my profile' : 'Review to pin'}
                            </span>
                        </label>
                    </div>
                </div>
                <h5>Review</h5>
                <input
                    autoComplete="off"
                    className="form-input"
                    id="title-input"
                    type="text"
                    value={state.title}
                    onChange={update('title')}
                    placeholder='Review title'
                />
                <textarea
                    className="form-input"
                    id="body-input"
                    value={state.body}
                    onChange={update('body')}
                    placeholder='Add a review...'
                />
                <div className="submit-buttons">
                    {
                        formType ?
                            <button className="submit delete" onClick={deleteReview}>
                                Delete
                            </button> : null
                    }
                    <button
                        className="submit"
                        type="submit"
                        disabled={parseInt(state.rating) === 0 || (formType === 'editReview' && !isReview)}
                    >
                        {submitText()}
                    </button>
                </div>
            </div>
        </form>
    );
}
