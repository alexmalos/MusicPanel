import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';

const ListIndex = ({ fetchLists }) => {
    const [state, setState] = useState(null);

    useEffect(() => {
        fetchLists().then(data => setState(data));
    }, []);

    const listDivClass = idx => {
        let classText = 'list-div';
        if (idx === 0) classText += ' first-list';
        if (idx === Object.keys(state.lists).length - 1) classText += ' last-list';
        return classText;
    };

    const listItemImage = ({ itemType, itemId }, idx) => {
        switch (itemType) {
            case 'Artist':
                return (
                    <Link to={`/artists/${itemId}`} className={`artist-image-link ${idx > 0 ? 'shifted' : ''}`} style={{ zIndex: 10 - idx }} key={idx}>
                        <img src={state.artists[itemId].photoUrl} alt="" />
                        <div className='link-border'></div>
                    </Link>
                );
            case 'Album':
                return (
                    <Link to={`/albums/${itemId}`} className={`album-cover-div ${idx > 0 ? 'shifted' : ''}`} style={{ zIndex: 10 - idx }} key={idx}>
                        <img src={state.albums[itemId].coverUrl} alt=""/>
                        <div className='cover-border' id="album-cover-border"></div>
                    </Link>
                );
            case 'Track':
                return (
                    <Link to={`/albums/${state.tracks[itemId].albumId}`} className={`album-cover-div ${idx > 0 ? 'shifted' : ''}`} style={{ zIndex: 10 - idx }} key={idx}>
                        <img src={state.albums[state.tracks[itemId].albumId].coverUrl} alt=""/>
                        <div className='cover-border' id="album-cover-border"></div>
                    </Link>
                );
            default:
                return null;
        }
    };
    
    if (state) return (
        <div className='music-lists-body'>
            <div className='left-body-div'>
                <h4>All lists</h4>
                <div className="list-list">
                    {
                        Object.values(state.lists).map((list, idx) => (
                            <div className={listDivClass(idx)} key={list.id}>
                                <Link to={`/lists/${list.id}`} className='link-overlay'></Link>
                                <div className="list-items-row">
                                    {list.listItems.slice(0, 10).map((item, idx) => listItemImage(item, idx))}
                                </div>
                                <h5 className="list-title">{list.title}</h5>
                                {
                                    list.description ?
                                        <div className="list-text-div">
                                            <p>{list.description}</p>
                                        </div> : null
                                }
                                <div className="list-author-info">
                                    <Link to={`/users/${list.authorId}`} className='profile-button'>
                                        <PersonIcon />
                                    </Link>
                                    <Link to={`/users/${list.authorId}`} className='list-author-username'>{state.users[list.authorId].username}</Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='right-body-div'>
                <div className="filter-div">
                    {/* <h4>Filters</h4> */}
                </div>
            </div>
        </div>
    );
};

import { connect } from 'react-redux';
import { fetchLists } from "../../actions/list_actions";

const mapDispatchToProps = dispatch => ({
    fetchLists: () => dispatch(fetchLists())
});

export default connect(null, mapDispatchToProps)(ListIndex);
