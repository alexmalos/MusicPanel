import React from "react";
import StarIcon from '@mui/icons-material/Star';

export default ({ rating, updateRating, id }) => (
    <div className="rating-stars" id={id}>
        <div className="background-stars">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
        </div>
        {
            updateRating ?
                <div className="input-stars">
                    <button
                        className={`star-button${rating >= 1 ? ' opaque' : ''}`}
                        onClick={updateRating(1)}
                    >
                        <StarIcon />
                    </button>
                    <button
                        className={`star-button right${rating >= 2 ? ' opaque' : ''}`}
                        onClick={updateRating(2)}
                    >
                        <StarIcon />
                    </button>
                    <button
                        className={`star-button${rating >= 3 ? ' opaque' : ''}`}
                        onClick={updateRating(3)}
                    >
                        <StarIcon />
                    </button>
                    <button
                        className={`star-button right${rating >= 4 ? ' opaque' : ''}`}
                        onClick={updateRating(4)}
                    >
                        <StarIcon />
                    </button>
                    <button
                        className={`star-button${rating >= 5 ? ' opaque' : ''}`}
                        onClick={updateRating(5)}
                    >
                        <StarIcon />
                    </button>
                    <button
                        className={`star-button right${rating >= 6 ? ' opaque' : ''}`}
                        onClick={updateRating(6)}
                    >
                        <StarIcon />
                    </button>
                    <button
                        className={`star-button${rating >= 7 ? ' opaque' : ''}`}
                        onClick={updateRating(7)}
                    >
                        <StarIcon />
                    </button>
                    <button
                        className={`star-button right${rating >= 8 ? ' opaque' : ''}`}
                        onClick={updateRating(8)}
                    >
                        <StarIcon />
                    </button>
                    <button
                        className={`star-button${rating >= 9 ? ' opaque' : ''}`}
                        onClick={updateRating(9)}
                    >
                        <StarIcon />
                    </button>
                    <button
                        className={`star-button right${rating >= 10 ? ' opaque' : ''}`}
                        onClick={updateRating(10)}
                    >
                        <StarIcon />
                    </button>
                </div> :
                <div className="preset-stars">
                    <div
                        className={`star-div${rating >= 1 ? ' opaque' : ''}`}
                    >
                        <StarIcon />
                    </div>
                    <div
                        className={`star-div right${rating >= 2 ? ' opaque' : ''}`}
                    >
                        <StarIcon />
                    </div>
                    <div
                        className={`star-div${rating >= 3 ? ' opaque' : ''}`}
                    >
                        <StarIcon />
                    </div>
                    <div
                        className={`star-div right${rating >= 4 ? ' opaque' : ''}`}
                    >
                        <StarIcon />
                    </div>
                    <div
                        className={`star-div${rating >= 5 ? ' opaque' : ''}`}
                    >
                        <StarIcon />
                    </div>
                    <div
                        className={`star-div right${rating >= 6 ? ' opaque' : ''}`}
                    >
                        <StarIcon />
                    </div>
                    <div
                        className={`star-div${rating >= 7 ? ' opaque' : ''}`}
                    >
                        <StarIcon />
                    </div>
                    <div
                        className={`star-div right${rating >= 8 ? ' opaque' : ''}`}
                    >
                        <StarIcon />
                    </div>
                    <div
                        className={`star-div${rating >= 9 ? ' opaque' : ''}`}
                    >
                        <StarIcon />
                    </div>
                    <div
                        className={`star-div right${rating >= 10 ? ' opaque' : ''}`}
                    >
                        <StarIcon />
                    </div>
                </div>
        }
    </div>
);
