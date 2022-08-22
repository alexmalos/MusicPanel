import React, { useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";

export default ({ alertType, review, closeAlert, entities }) => {
    useEffect(() => {
        console.log(alertType);
        setTimeout(closeAlert, 4000);
    }, []);

    let text;
    switch (alertType) {
        case 'newReview':
            let itemText;
            switch (review.itemType) {
                case 'Artist':
                    itemText = entities.artists[review.itemId].name;
                    break;
                case 'Album':
                    itemText = entities.albums[review.itemId].title;
                    break;
                case 'Track':
                    itemText = entities.songs[review.itemId].title;
                    break;
                default:
                    break;
            }
            text = <p>{`Thanks for rating ${itemText}!`} <Link to={`reviews/${review.id}`}>View rating.</Link></p>;
            break;
        case 'editReview':
            text = <p>Your rating was changed. <Link to={`reviews/${review.id}`}>View it here.</Link></p>;
            break;
        default:
            break;
    }

    return (
        <div className="alert">
            <div className="alert-inner">
                <div className="alert-content">
                    {text}
                    <button onClick={closeAlert}>
                        <CloseIcon/>
                    </button>
                </div>
                <div className="alert-timer"></div>
            </div>
        </div>
    );
};