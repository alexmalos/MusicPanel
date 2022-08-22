import React, { useEffect, useState } from "react";
import ExplicitIcon from '@mui/icons-material/Explicit';
import CheckIcon from '@mui/icons-material/Check';
import StarIcon from '@mui/icons-material/Star';

export default props => {
    const { authorId, itemType, itemId, entities } = props;

    let item;
    switch (itemType) {
        case 'Artist':
            item = entities.artists[itemId];
            break;
        case 'Album':
            item = entities.albums[itemId];
            break;
        case 'Track':
            item = entities.songs[itemId];
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
    
    const [state, setState] = useState(props.review);
    const [isReview, setIsReview] = useState(false);

    useEffect(() => {
        if (state.title === '' && state.body === '') setIsReview(false);
        else setIsReview(true);
    }, [state.title, state.body])

    const submitText = () => {
        if (parseInt(state.rating) === 0) return 'Missing Rating';
        else if (isReview) return 'Post Review';
        else return `Rate ${itemType}`;
    }

    const updateRating = rating => e => {
        e.preventDefault();
        setState(Object.assign({}, state, { rating }))
    };

    const handleSubmit = e => {
        e.preventDefault();
        const review = Object.assign({}, state, {
            author_id: authorId,
            item_type: itemType === 'Track' ? 'Song' : itemType,
            item_id: itemId
        });
        props.processForm(review);
    };

    const update = field => e => (
        setState(Object.assign({}, state, { [field]: e.target.value }))
    );

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
                            <div className="rating-stars">
                                <div className="background-stars">
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                </div>
                                <div className="input-stars">
                                    <button
                                        className={`star-button${state.rating >= 1 ? ' opaque' : ''}`}
                                        onClick={updateRating(1)}
                                    >
                                        <StarIcon />
                                    </button>
                                    <button
                                        className={`star-button right${state.rating >= 2 ? ' opaque' : ''}`}
                                        onClick={updateRating(2)}
                                    >
                                        <StarIcon />
                                    </button>
                                    <button
                                        className={`star-button${state.rating >= 3 ? ' opaque' : ''}`}
                                        onClick={updateRating(3)}
                                    >
                                        <StarIcon />
                                    </button>
                                    <button
                                        className={`star-button right${state.rating >= 4 ? ' opaque' : ''}`}
                                        onClick={updateRating(4)}
                                    >
                                        <StarIcon />
                                    </button>
                                    <button
                                        className={`star-button${state.rating >= 5 ? ' opaque' : ''}`}
                                        onClick={updateRating(5)}
                                    >
                                        <StarIcon />
                                    </button>
                                    <button
                                        className={`star-button right${state.rating >= 6 ? ' opaque' : ''}`}
                                        onClick={updateRating(6)}
                                    >
                                        <StarIcon />
                                    </button>
                                    <button
                                        className={`star-button${state.rating >= 7 ? ' opaque' : ''}`}
                                        onClick={updateRating(7)}
                                    >
                                        <StarIcon />
                                    </button>
                                    <button
                                        className={`star-button right${state.rating >= 8 ? ' opaque' : ''}`}
                                        onClick={updateRating(8)}
                                    >
                                        <StarIcon />
                                    </button>
                                    <button
                                        className={`star-button${state.rating >= 9 ? ' opaque' : ''}`}
                                        onClick={updateRating(9)}
                                    >
                                        <StarIcon />
                                    </button>
                                    <button
                                        className={`star-button right${state.rating >= 10 ? ' opaque' : ''}`}
                                        onClick={updateRating(10)}
                                    >
                                        <StarIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="checkbox-div">
                        <h5>Private</h5>
                        <input
                            id="private-input"
                            type="checkbox"
                            value={state.private}
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
                            value={state.pinned}
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
                <button
                    className="submit"
                    type="submit"
                    disabled={parseInt(state.rating) === 0}>
                    {submitText()}
                </button>
            </div>
        </form>
    );
};
