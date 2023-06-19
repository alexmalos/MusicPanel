import React, { useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";

export default ({ alerts, fireAlert, closeAlert, entities }) => {
    useEffect(() => {
        const alert = alerts.find(alert => !alert.fired);
        if (alert) {
            fireAlert(alert);
            setTimeout(() => closeAlert(alert), 4000);
        }
    }, [alerts]);

    const alertText = ({ review, list, alertType }) => {
        let text;
        switch (alertType) {
            case 'newReview':
            case 'newRating':
                let itemText;
                switch (review.itemType) {
                    case 'Artist':
                        itemText = entities.artists[review.itemId].name;
                        break;
                    case 'Album':
                        itemText = entities.albums[review.itemId].title;
                        break;
                    case 'Track':
                        itemText = entities.tracks[review.itemId].title;
                        break;
                    default:
                        break;
                }
                text = <p>{`Thanks for ${alertType === 'newReview' ? 'reviewing' : 'rating'} ${itemText}!`} <Link to={`/reviews/${review.id}`}>View {alertType === 'newReview' ? 'review' : 'rating'}.</Link></p>;
                break;
            case 'editReview':
            case 'editRating':
                text = <p>Your {alertType === 'editReview' ? 'review' : 'rating'} was changed. <Link to={`/reviews/${review.id}`}>View it here.</Link></p>;
                break;
            case 'newList':
                text = <p>Thanks for creating this list!</p>
                break;
            case 'editList':
                text = <p>Successfully updated list. <Link to={`/lists/${list.id}`}>View it here.</Link></p>
                break;
            default:
                break;
        }
        return text;
    };

    return (
        <div className="alerts">
            {
                alerts.map((alert, i) => (
                    <div className="alert" key={i}>
                        <div className="alert-inner">
                            <div className="alert-content">
                                {alertText(alert)}
                                <button onClick={() => closeAlert(alert)}>
                                    <CloseIcon/>
                                </button>
                            </div>
                            <div className="alert-timer"></div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};
