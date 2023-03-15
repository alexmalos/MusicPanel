import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ModalContainer from "../modal/modal_container";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import AlbumIcon from '@mui/icons-material/Album';

export default ({ loggedIn, openModal, musicType, item, fetchUser, sessionId, modalType, closeModal, createListItems, closeModalConfirm }) => {
    const [lists, setLists] = useState(null);
    const [listsToAddTo, setListsToAddTo] = useState(new Set());

    const addToList = () => {
        fetchUser(sessionId).then(({ lists }) => {
            setLists(Object.values(lists));
            openModal('addToList', true);
        });
    };

    const changeListToAddTo = id => {
        const newSet = new Set(listsToAddTo);
        listsToAddTo.has(id) ? newSet.delete(id) : newSet.add(id);
        setListsToAddTo(newSet);
    };

    const headerText = () => {
        return listsToAddTo.size === 0 ? 'Select Lists' : `${listsToAddTo.size} Selected`
    };

    useEffect(() => {
        if (modalType !== addToList) setListsToAddTo(new Set());
    }, [modalType]);

    useEffect(() => {
        if (listsToAddTo.size > 0) closeModalConfirm("Are you sure you want to continue? All changes will be lost.");
        else closeModalConfirm(null);
    }, [listsToAddTo])
 
    const modal = () => (
        <div id="add-to-list-modal">
            <Link to={`/lists/new?type=${musicType[0].toUpperCase() + musicType.slice(1)}&id=${item.id}`}
            onClick={closeModal}
            className='list-modal-item'>
                <div className="new-list-icon list-icon">
                    <AddIcon />
                </div>
                <div className="list-text">
                    <h6>New List</h6>
                    <p>Start a new list with {item.title ? item.title : item.name} and more...</p>
                </div>
            </Link>
            {
                lists.map((list, i) => (
                    <label className='list-modal-item' key={i}>
                        <div className="list-icon">
                            <AlbumIcon />
                            <div className="list-icon-border"></div>
                        </div>
                        <div className="list-text">
                            <h6>{list.title}</h6>
                            <p>{list.listItems.length} {list.listItems.length === 1 ? 'entry' : 'entries'}</p>
                        </div>
                        <input type="checkbox" id={`list${i}`} onChange={e => changeListToAddTo(list.id)} />
                        <label htmlFor={`list${i}`} className='list-input-label'>
                            <span className="checkbox-span">
                                <CheckIcon />
                            </span>
                        </label>
                    </label>
                ))
            }
        </div>
    );

    const handleSave = () => {
        closeModalConfirm(null);
        closeModal();
        createListItems({
            item_id: item.id,
            item_type: musicType,
            list_ids: Array.from(listsToAddTo)
        });
    }

    return (
        <div className='option-menu'>
            {
                loggedIn ?
                    [
                        // <button key={1} className='first-option'>Add to Listen Later</button>,
                        <button onClick={addToList} key={2} className={`first-option music-option-button ${item.spotify ? '' : 'last-option'}`}>Add {musicType} to a list</button>
                    ] :
                    <button className={`first-option music-option-button ${item.spotify ? '' : 'last-option'}`} onClick={() => openModal('login')}>Sign in for more options</button>
            }
            {
                item.spotify ?
                <a className="last-option music-option-button" href={`https://open.spotify.com/${item.spotify}`} target='_blank'>
                    Listen on Spotify
                </a> : null
            }
            {modalType === 'addToList' && lists ? <ModalContainer component={modal()} saveDisabled={listsToAddTo.size === 0} headerText={headerText()} handleSave={handleSave} /> : null}
        </div>
    );
};
