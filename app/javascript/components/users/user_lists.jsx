/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PageNotFound from "../page_not_found";
import LockIcon from '@mui/icons-material/Lock';
import UserCollectionTabBar from "./user_collection_tab_bar";

export default function UserLists ({ sessionId, fetchUser, entities }) {
    const [user, setUser] = useState(null);
    const [lists, setLists] = useState(null);
    const [pageNotFound, setPageNotFound] = useState(false);
    const params = useParams();
    const userId = parseInt(params.userId);

    const listDivClass = idx => {
        let classText = 'list-div';
        if (idx === 0) classText += ' first-list';
        if (idx === lists.length - 1) classText += ' last-list';
        return classText;
    };

    useEffect(() => {
        setUser(null);
        setLists(null);
        setPageNotFound(false);

        fetchUser(userId).then(({ user, lists }) => {
            setUser(user);
            if (sessionId === userId) setLists(Object.values(lists));
            else setLists(Object.values(lists).filter(list => !list.private));
        }, () => setPageNotFound(true));
    }, [fetchUser, sessionId, userId]);

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

    if (pageNotFound) return <PageNotFound />;
    else if (user && lists) return (
        <div className="user-collection">
            <UserCollectionTabBar user={user} />
            <div className="user-lists-body">
                <div className='left-body-div'>
                    <h4>Lists by <Link className="user-lists-profile-link" to={`/users/${user.id}`}>{user.username}</Link></h4>
                    <div className="list-list">
                        {
                            lists.length > 0 ?
                            lists.map((list, idx) => (
                                <div className={listDivClass(idx)} key={list.id}>
                                    <Link to={`/lists/${list.id}`} className='link-overlay'></Link>
                                    <div className="list-items-row">
                                        {list.listItems.slice(0, 10).map((item, idx) => listItemImage(item, idx))}
                                    </div>
                                    <div className='list-title-div'>
                                        <h5 className="list-title">{list.title}</h5>
                                        {list.private ? <LockIcon className='lock-icon'/> : null}
                                    </div>
                                    {
                                        list.description ?
                                            <div className="list-text-div">
                                                <p>{list.description}</p>
                                            </div> : null
                                    }
                                </div>
                            )) :
                            <p className="no-reviews">
                                {user.username} has no lists yet.
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
}
