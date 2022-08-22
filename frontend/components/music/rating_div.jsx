import React from "react";
import StarIcon from '@mui/icons-material/Star';
import LockIcon from '@mui/icons-material/Lock';

export default ({ loggedIn, openLoginModal, renderModal, itemType, item, userRating }) => (
    <div className='rating-div'>
        <div className='rating-info'>
            <div className='info-div'>
                <div className='inner-info-div'>
                    <h3>{item.reviewIds.length}</h3>
                    <p>Total rating{item.reviewIds.length !== 1 ? 's' : null}</p>
                </div>
            </div>
            <div className='info-div'>
                <div className='divider'></div>
                <div className='inner-info-div'>
                    <div className={`star-div${item.reviewIds.length > 0 ? ' yellow' : ''}`}>
                        <StarIcon />
                        <h3>{item.averageRating ? item.averageRating : 0}<span> / 5</span></h3>
                    </div>
                    <p>Average rating</p>
                </div>
            </div>
            <div className='info-div'>
                <div className='divider'></div>
                <div className='inner-info-div'>
                    <div className={`star-div${userRating ? ' yellow' : ''}`}>
                        <StarIcon />
                        <h3>{userRating ? userRating / 2 : 0}<span> / 5</span></h3>
                    </div>
                    <p>Your rating</p>
                </div>
            </div>
        </div>
        {
            loggedIn ?
                <button onClick={renderModal}>
                    <StarIcon />
                    Rate {itemType}
                </button> :
                <button onClick={openLoginModal}>
                    <LockIcon />
                    Sign in to rate this {itemType[0].toLowerCase() + itemType.slice(1)}
                </button>
        }
    </div>
);
