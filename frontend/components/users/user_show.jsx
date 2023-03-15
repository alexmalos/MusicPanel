import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ModalContainer from "../modal/modal_container";
import PageNotFound from "../page_not_found";
import PersonIcon from '@mui/icons-material/Person';
import RatingStars from "../reviews/rating_stars";
import ExplicitIcon from '@mui/icons-material/Explicit';
import LockIcon from '@mui/icons-material/Lock';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PushPinIcon from '@mui/icons-material/PushPin';
import { Croppie } from "croppie";

export default ({ sessionId, userId, fetchUser, entities, openModal, modalType, updateList }) => {
    const [user, setUser] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [lists, setLists] = useState(null);
    const [pageNotFound, setPageNotFound] = useState(false);
    const [currentPinnedTab, setCurrentPinnedTab] = useState('reviews');

    const itemDivClass = (item, idx) => {
        if (item.rating) {
            let classText = 'review-div';
            if (idx === 0) classText += ' first-review';
            if (idx === pinnedItems().length - 1) classText += ' last-review';
            return classText;
        } else {
            let classText = 'list-div';
            if (idx === 0) classText += ' first-list';
            if (idx === pinnedItems().length - 1) classText += ' last-list';
            return classText;
        }
    };

    const pinnedItems = () => {
        let items;
        if (sessionId === userId) {
            items = fullReviews().filter(review => review.pinned).concat(lists.filter(list => list.pinned))
        } else {
            items = fullReviews().filter(review => review.pinned && !review.private).concat(lists.filter(list => list.pinned && !list.private))
        }
        return items.sort((a, b) => {
            if (a.timestamp < b.timestamp) return 1;
            else return -1;
        });
    };

    const fullReviews = () => reviews.filter(review => review.title || review.body);

    useEffect(() => {
        setUser(null);
        setReviews(null);
        setLists(null);
        setPageNotFound(false);

        fetchUser(userId).then(({ user, reviews, lists }) => {
            setUser(user);
            setReviews(Object.values(reviews));
            setLists(Object.values(lists));
        }, () => setPageNotFound(true));
    }, [userId]);

    function readFile(input) {
        let $uploadCrop = $('#croppie').croppie({
			viewport: {
				width: 200,
				height: 200,
				type: 'circle'
			},
			enableExif: true,
            boundary: {
                width: 200,
                height: 200
            }
		});

        if (input.files && input.files[0]) {
           let reader = new FileReader();
           
           reader.onload = e => {
               $('.croppie').addClass('ready');
               $uploadCrop.croppie('bind', {
                   url: e.target.result
               });
           }
           
           reader.readAsDataURL(input.files[0]);
       } else {
           alert("Sorry - your browser doesn't support the FileReader API");
       }
   }

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

    const listItemImage = ({ itemType, itemId }, idx) => {
        switch (itemType) {
            case 'Artist':
                return (
                    <Link to={`/artists/${itemId}`} className={`artist-image-link ${idx > 0 ? 'shifted' : ''}`} style={{ zIndex: 10 - idx }} key={idx}>
                        <img src={entities.artists[itemId].photoUrl} alt="" />
                        <div className='link-border'></div>
                    </Link>
                );
            case 'Album':
                return (
                    <Link to={`/albums/${itemId}`} className={`album-cover-div ${idx > 0 ? 'shifted' : ''}`} style={{ zIndex: 10 - idx }} key={idx}>
                        <img src={entities.albums[itemId].coverUrl} alt=""/>
                        <div className='cover-border' id="album-cover-border"></div>
                    </Link>
                );
            case 'Track':
                return (
                    <Link to={`/albums/${entities.tracks[itemId].albumId}`} className={`album-cover-div ${idx > 0 ? 'shifted' : ''}`} style={{ zIndex: 10 - idx }} key={idx}>
                        <img src={entities.albums[entities.tracks[itemId].albumId].coverUrl} alt=""/>
                        <div className='cover-border' id="album-cover-border"></div>
                    </Link>
                );
            default:
                return null;
        }
    };

    const modal = () => {
        switch (modalType) {
            case 'managePins':
                return (
                    <div>
                        <div className="pin-tabs">
                            <button onClick={() => setCurrentPinnedTab('reviews')}
                            className={currentPinnedTab === 'reviews' ? 'active' : ''}>Reviews</button>
                            <button onClick={() => setCurrentPinnedTab('lists')}
                            className={currentPinnedTab === 'lists' ? 'active' : ''}>Lists</button>
                        </div>
                        {
                            currentPinnedTab === 'reviews' ?
                            <div>
    
                            </div> :
                            <div>
    
                            </div>
                        }
                    </div>
                );
            case 'editProfile':
                return (
                    <div>
                        <button id="change-pfp-button" onClick={() => openModal('changePfp', true)}>
                            <span>
                                <PersonIcon />
                            </span>
                            Change profile picture
                        </button>
                        <p></p>
                    </div>
                );
            case 'changePfp':
                return (
                    <div></div>
                );
            default:
                break;
        }
    };
    
    if (pageNotFound) return <PageNotFound />;
    else if (user && reviews && lists) return (
        <div>
            <div className='user-header'>
                <div className='header-content'>
                    <div className='header-info'>
                        <div className='header-flex'>
                            <div className="user-div">
                                <div className='profile-pic'>
                                    <PersonIcon />
                                </div>
                                <div className='user-info'>
                                    <h5 className={user.name ? '' : 'zeropacity'}>{user.username}</h5>
                                    <h1>{user.name ? user.name : user.username}</h1>
                                    <p>{user.biography}</p>
                                </div>
                            </div>
                            <div className="review-numbers-div">
                                <div className='rating-info'>
                                    <div className='info-link'>
                                        <div className='inner-info-div'>
                                            <h3>{fullReviews().length}</h3>
                                            <p>Review{fullReviews().length !== 1 ? 's' : null}</p>
                                        </div>
                                    </div>
                                    <div className='info-link'>
                                        <div className='divider'></div>
                                        <div className='inner-info-div'>
                                            <h3>{reviews.length}</h3>
                                            <p>Rating{reviews.length !== 1 ? 's' : null}</p>
                                        </div>
                                    </div>
                                </div>
                                {sessionId === userId ? <button onClick={() => openModal('editProfile', true)}>Edit Profile</button> : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='header-tabs'>
                    <div className='tab-div'>
                        <Link to={`/users/${userId}`}>Home</Link>
                        <div className='active'></div>
                    </div>
                    <div className='tab-div'>
                        <Link to={`/users/${userId}/reviews`} className='inactive'>
                            Collection
                        </Link>
                    </div>
                </div>
            </div>
            <div className="user-home-body">
                <div className='left-body-div'>
                    <Link to={`/users/${userId}/pinned`} className='header-button'>
                        <span>Pinned</span>
                        <ChevronRightIcon className='right-arrow' />
                    </Link>
                    <div className="pinned-items">
                        {
                            (pinnedItems().length > 0) ? pinnedItems().map((item, idx) => {
                                if (item.rating) return (
                                    <div className={itemDivClass(item, idx)} key={item.id}>
                                        <Link to={`/reviews/${item.id}`} className='link-overlay'></Link>
                                        {reviewItemInfo(item)}
                                        {item.title ? <h5 className="review-title">{item.title}</h5> : null}
                                        <div className='user-rating-icons'>
                                            <RatingStars id={item.title ? null : 'rating-stars-top'} rating={item.rating} />
                                            {item.private ? <LockIcon className='lock-icon'/> : null}
                                        </div>
                                        {
                                            item.body ?
                                                <div className="review-text-div" id="review-index-text-div">
                                                    <p>{item.body}</p>
                                                </div> : null
                                        }
                                    </div>
                                );
                                else return (
                                    <div className={itemDivClass(item, idx)} key={item.id}>
                                        <Link to={`/lists/${item.id}`} className='link-overlay'></Link>
                                        <div className="list-items-row">
                                            {item.listItems.slice(0, 10).map((item, idx) => listItemImage(item, idx))}
                                        </div>
                                        <div className='list-title-div'>
                                            <h5 className="list-title">{item.title}</h5>
                                            {item.private ? <LockIcon className='lock-icon'/> : null}
                                        </div>
                                        {
                                            item.description ?
                                                <div className="list-text-div">
                                                    <p>{item.description}</p>
                                                </div> : null
                                        }
                                    </div>
                                );
                            }) :
                            <div className="no-pins">
                                <p>{sessionId === userId ? 'You have' : `${user.username} has`} no pinned content.</p>
                                {sessionId === userId ? <button onClick={() => openModal('managePins', true)}>
                                    <PushPinIcon />
                                    <p>Pin a review.</p>
                                </button> : null}
                            </div>
                            
                        }
                    </div>
                </div>
                <div className='right-body-div'>
                    <div className="filter-div">
                        {/* <h4>Filters</h4> */}
                        <input type="file" id="upload" accept="image/*" onChange={event => readFile(event.currentTarget)}></input>
                        <div id="croppie"></div>
                    </div>
                </div>
            </div>
            
            <ModalContainer component={modal()} />
        </div>
    );
};
