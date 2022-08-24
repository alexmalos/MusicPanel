import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../page_not_found';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import OptionMenu from './list_option_menu';

export default ({ listId, sessionId, fetchList, entities, openModal }) => {

    const [list, setList] = useState(null);
    const [listItems, setListItems] = useState(null);
    const [user, setUser] = useState(null);
    const [pageNotFound, setPageNotFound] = useState(false);

    const listDateString = () => {
        const date = new Date(list.updateDate.split('-'));
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    useEffect(() => {
        setList(null);
        setListItems(null);
        setUser(null);
        setPageNotFound(false);

        fetchList(listId)
            .then(({ listItems, list, user }) => {
                setList(list);
                listItems.sort((a, b) => a.orderNumber - b.orderNumber);
                setListItems(listItems);
                setUser(user);
            }, () => setPageNotFound(true));
    }, [listId]);

    const listItemElement = listItem => {
        switch (listItem.itemType) {
            case 'Artist':
                return (
                    <div className="list-item" key={listItem.orderNumber}>
                        <div className='artist-image-div'>
                            <Link to={`/artists/${listItem.itemId}`} className='artist-image-link'>
                                <img src={entities.artists[listItem.itemId].photoUrl} alt="" />
                                <div className='link-border'></div>
                            </Link>
                        </div>
                        <Link className='item-link' to={`/artists/${listItem.itemId}`}>{entities.artists[listItem.itemId].name}</Link>
                    </div>
                );
            case 'Album':
                return (
                    <div className="list-item" key={listItem.orderNumber}>
                        <div className='album-cover-div'>
                            <Link className='album-cover-link' to={`/albums/${listItem.itemId}`}>
                                <img src={entities.albums[listItem.itemId].coverUrl} alt=""/>
                                <div className='cover-border' id="album-cover-border"></div>
                            </Link>
                        </div>
                        <Link className="item-link" to={`/albums/${listItem.itemId}`}>{entities.albums[listItem.itemId].title}</Link>
                        <Link className='artist-link' to={`/artists/${entities.albums[listItem.itemId].artistId}`}>{entities.artists[entities.albums[listItem.itemId].artistId].name}</Link>
                    </div>
                );
            case 'Track':
                return (
                    <div className="list-item" key={listItem.orderNumber}>
                        <div className='album-cover-div'>
                            <Link className='album-cover-link' to={`/albums/${entities.tracks[listItem.itemId].albumId}`}>
                                <img src={entities.albums[entities.tracks[listItem.itemId].albumId].coverUrl} alt=""/>
                                <div className='cover-border' id="album-cover-border"></div>
                            </Link>
                        </div>
                        <Link className="item-link" to={`/albums/${entities.tracks[listItem.itemId].albumId}`}>{entities.tracks[listItem.itemId].title}</Link>
                        <Link className='artist-link' to={`/artists/${entities.tracks[listItem.itemId].artistId}`}>{entities.artists[entities.tracks[listItem.itemId].artistId].name}</Link>
                    </div>
                );
            default:
                return null;
        }
    };

    if (pageNotFound) return <PageNotFound />;
    else if (list && user && listItems) return (
        <div className='list-body'>
            <div className='left-body-div'>
                <div className='top-info'>
                    <div className="user-info">
                        <Link to={`/users/${list.authorId}`} className='profile-button'>
                            <PersonIcon />
                        </Link>
                        <Link to={`/users/${list.authorId}`} className='user-username'>{entities.users[list.authorId].username}</Link>
                    </div>
                    <p className='list-date'>{listDateString()}</p>
                </div>
                <div className='list-title'>
                    <h4>{list.title}</h4>
                    {list.private ? <LockIcon className='lock-icon'/> : null}
                </div>
                {
                    list.description ?
                        <p className='list-description'>{list.description}</p>
                        : null
                }
                <div className='list-item-grid'>
                    {
                        listItems.map(listItem => (
                            listItemElement(listItem)
                        ))
                    }
                </div>
            </div>
            <div className='right-body-div'>
                <OptionMenu
                    sessionId={sessionId}
                    openModal={openModal}
                    user={user}
                    listId={list.id}
                />
            </div>
        </div>
    );
    else return null;
};
