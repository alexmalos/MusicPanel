import React from "react";
import StarIcon from '@mui/icons-material/Star';
import LockIcon from '@mui/icons-material/Lock';

export default ({ loggedIn, openLoginModal, musicType }) => (
    <div className='rating-div'>
        <div className='rating-info'>
            <div className='info-div'>
                <div className='inner-info-div'>
                    <h3>0</h3>
                    <p>Total ratings</p>
                </div>
            </div>
            <div className='info-div'>
                <div className='divider'></div>
                <div className='inner-info-div'>
                    <div className='star-div'>
                        <StarIcon />
                        <h3>0
                            <span> / 5</span>
                        </h3>
                    </div>
                    <p>Average rating</p>
                </div>
            </div>
            <div className='info-div'>
                <div className='divider'></div>
                <div className='inner-info-div'>
                    <div className='star-div'>
                        <StarIcon />
                        <h3>0
                            <span> / 5</span>
                        </h3>
                    </div>
                    <p>Your rating</p>
                </div>
            </div>
        </div>
        {
            loggedIn ?
                <button>
                    <StarIcon />
                    Rate {musicType[0].toUpperCase() + musicType.slice(1)}
                </button> :
                <button onClick={openLoginModal}>
                    <LockIcon />
                    Sign in to rate this {musicType}
                </button>
        }
    </div>
);