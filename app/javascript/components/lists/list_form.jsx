/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Link, useLocation, Navigate, useParams } from "react-router-dom";
import PageNotFound from "../page_not_found";
import ModalContainer from "../modal/modal_container";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ReorderIcon from '@mui/icons-material/Reorder';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import snakecaseKeys from "snakecase-keys";

export default function ListForm({ modalType, sessionId, fetchList, entities, updateList, createList, deleteList, openModal, closeModal, newForm, fetchAlbum, fetchArtist, fetchTrack, openAlert }) {

    const [savedList, setSavedList] = useState(null);
    const [list, setList] = useState(null);
    const [listItems, setListItems] = useState(null);
    const [pageNotFound, setPageNotFound] = useState(false);
    const [createdListId, setCreatedListId] = useState(null);
    const search = useLocation().search;
    const params = useParams();
    const listId = parseInt(params.listId);

    useEffect(() => {
        if (!newForm) {
            fetchList(listId)
                .then(({ listItems, list }) => {
                    setSavedList(list);
                    setList(list);
                    listItems.sort((a, b) => a.orderNumber - b.orderNumber);
                    setListItems(listItems);
                }, () => setPageNotFound(true));
        } else {
            setList({
                title: '',
                description: '',
                private: false,
                pinned: false,
                numbered: false,
                author_id: sessionId
            });
            const queryParams = new URLSearchParams(search);
            const itemType = queryParams.get('type');
            const itemId = queryParams.get('id');
            const newListItem = {
                itemType,
                itemId,
                orderNumber: 0
            };
            switch (itemType) {
                case 'Artist':
                    fetchArtist(itemId).then(() => {
                        setListItems([newListItem]);
                    }, () => setListItems([]));
                    break;
                case 'Album':
                    fetchAlbum(itemId).then(() => {
                        setListItems([newListItem]);
                    }, () => setListItems([]));
                    break;
                case 'Track':
                    fetchTrack(itemId).then(() => {
                        setListItems([newListItem]);
                    }, () => setListItems([]));
                    break;
                default:
                    break;
            }
        }
    }, [fetchAlbum, fetchArtist, fetchList, fetchTrack, listId, newForm, search, sessionId]);

    const modal = (
        <div className='edit-list-modal'>
            <p>Are you sure you want to delete this list?</p>
            <div className='button-div'>
                <button id='no-button' onClick={closeModal}>No</button>
                <Link to={`/users/${sessionId}`} id='delete-link' onClick={() => deleteList(listId)}>Delete</Link>
            </div>
        </div>
    );

    const listButtonText = () => {
        if (list.title.length === 0) return 'Title needed';
        else if (newForm) {
            if (listItems.length === 0) return 'Music needed';
            else return 'Create List';
        } else return 'Update information'
    };

    const listItemElement = (listItem, index) => {
        switch (listItem.itemType) {
            case 'Artist':
                return (
                    <div className="list-item">
                    {list.numbered ? <h6 className="order-number">{index + 1}</h6> : null}
                        <div className='artist-image-div'>
                            <div className='artist-image-link'>
                                <img src={entities.artists[listItem.itemId].photoUrl} alt="" />
                                <div className='link-border'></div>
                            </div>
                        </div>
                        <p className='item-link'>{entities.artists[listItem.itemId].name}</p>
                        <button className="delete" onClick={() => deleteItem(index)}>
                            <DeleteIcon/>
                        </button>
                        <ReorderIcon className="reorder"/>
                    </div>
                );
            case 'Album':
                return (
                    <div className="list-item">
                    {list.numbered ? <h6 className="order-number">{index + 1}</h6> : null}
                        <div className='album-cover-div'>
                            <div className='album-cover-link'>
                                <img src={entities.albums[listItem.itemId].coverUrl} alt=""/>
                                <div className='cover-border' id="album-cover-border"></div>
                            </div>
                        </div>
                        <div className="item-flex">
                            <p className="item-link">{entities.albums[listItem.itemId].title}</p>
                            <p className='artist-link'>{entities.artists[entities.albums[listItem.itemId].artistId].name}</p>
                        </div>
                        <button className="delete" onClick={() => deleteItem(index)}>
                            <DeleteIcon/>
                        </button>
                        <ReorderIcon className="reorder"/>
                    </div>
                );
            case 'Track':
                return (
                    <div className="list-item">
                        {list.numbered ? <h6 className="order-number">{index + 1}</h6> : null}
                        <div className='album-cover-div'>
                            <div className='album-cover-link'>
                                <img src={entities.albums[entities.tracks[listItem.itemId].albumId].coverUrl} alt=""/>
                                <div className='cover-border' id="album-cover-border"></div>
                            </div>
                        </div>
                        <div className="item-flex">
                            <p className="item-link">{entities.tracks[listItem.itemId].title}</p>
                            <p className='artist-link'>{entities.artists[entities.tracks[listItem.itemId].artistId].name}</p>
                        </div>
                        <button className="delete" onClick={() => deleteItem(index)}>
                            <DeleteIcon/>
                        </button>
                        <ReorderIcon className="reorder"/>
                    </div>
                );
            default:
                return null;
        }
    };

    const listUnchanged = () => {
        if (JSON.stringify(list) === JSON.stringify(savedList)) return true;
        else return false;
    };

    const handleDrop = droppedItem => {
        if (!droppedItem.destination) return;
        const updatedList = [...listItems];
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
        updatedList.forEach((listItem, i) => {
            listItem.orderNumber = i;
        });
        setListItems(updatedList);
    };

    const deleteItem = index => {
        const updatedList = [...listItems];
        updatedList.splice(index, 1);
        updatedList.forEach((listItem, i) => {
            listItem.orderNumber = i;
        });
        setListItems(updatedList);
    };

    const handleListUpdate = info => {
        let sendList;
        if (info) {
            sendList = list;
            setSavedList(list);
            openAlert({
                list,
                alertType: 'editList',
                fired: false
            });
        }
        else sendList = savedList;
        updateList({ list: snakecaseKeys(sendList), list_items: snakecaseKeys(listItems) });
    };

    const handleListCreate = () => {
        createList({ list: snakecaseKeys(list), list_items: snakecaseKeys(listItems) }).then(({ list }) => {
            setCreatedListId(list.id);
        });
        
    };

    const update = field => e => {
        if (field === 'pinned' || field === 'private' || field === 'numbered') {
            setList(Object.assign({}, list, { [field]: e.target.checked }));
        } else setList(Object.assign({}, list, { [field]: e.target.value }));
    };

    if (pageNotFound || (!newForm && list && list.authorId !== sessionId)) return <PageNotFound />;
    else if (createdListId) return <Navigate to={`/lists/${createdListId}`} />;
    else if (list && listItems) return (
      <div>
        <div className="list-edit">
          {newForm ? null : (
            <Link
              to={`/lists/${listId}`}
              onClick={() => handleListUpdate(false)}
              id="list-back-link"
            >
              <p>Go back to list</p>
            </Link>
          )}
          <div className="list-edit-flex">
            <div className="left-body-div">
              <h4>Music</h4>
              <DragDropContext onDragEnd={handleDrop}>
                <Droppable droppableId="list-container">
                  {provided => (
                    <div
                      className="list-container"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {listItems.length === 0 ? (
                        <p className="empty-list-text">Your list is empty.</p>
                      ) : (
                        listItems.map((item, index) => (
                          <Draggable
                            key={index}
                            draggableId={index.toString()}
                            index={index}
                          >
                            {provided => (
                              <div
                                className="item-container"
                                ref={provided.innerRef}
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                              >
                                {listItemElement(item, index)}
                              </div>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
            <div className="right-body-div">
              <h4>Information</h4>
              <div className="checkbox-flex">
                <div className="checkbox-div">
                  <h5>Private</h5>
                  <input
                    id="private-input"
                    type="checkbox"
                    checked={list.private}
                    onChange={update("private")}
                  />
                  <label htmlFor="private-input">
                    <span className="checkbox-span">
                      <CheckIcon />
                    </span>
                    <span className="checkbox-text">Private list</span>
                  </label>
                </div>
                <div className="checkbox-div">
                  <h5>Pinned</h5>
                  <input
                    id="pinned-input"
                    type="checkbox"
                    checked={list.pinned}
                    onChange={update("pinned")}
                  />
                  <label htmlFor="pinned-input">
                    <span className="checkbox-span">
                      <CheckIcon />
                    </span>
                    <span className="checkbox-text">Pin to my profile</span>
                  </label>
                </div>
              </div>
              <div className="checkbox-div">
                <h5>Numbered</h5>
                <input
                  id="numbered-input"
                  type="checkbox"
                  checked={list.numbered}
                  onChange={update("numbered")}
                />
                <label htmlFor="numbered-input">
                  <span className="checkbox-span">
                    <CheckIcon />
                  </span>
                  <span className="checkbox-text">
                    Show ranking in the list
                  </span>
                </label>
              </div>
              <h5>Information</h5>
              <input
                className="form-input"
                type="text"
                onChange={update("title")}
                placeholder={newForm ? "Title *" : "Title of list"}
                value={list.title}
              />
              <textarea
                className="form-input"
                onChange={update("description")}
                placeholder={newForm ? "Add a description..." : "Description"}
                value={list.description ? list.description : ""}
              />
              <button
                id="update-button"
                className="submit"
                disabled={
                  newForm
                    ? listButtonText() !== "Create List"
                    : list.title.length === 0 || listUnchanged()
                }
                onClick={
                  newForm ? handleListCreate : () => handleListUpdate(true)
                }
              >
                {listButtonText()}
              </button>
              {newForm ? null : (
                <button
                  id="delete-button"
                  className="submit"
                  onClick={() => openModal("deleteList", true)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
        {modalType === "deleteList" ? (
          <ModalContainer
            component={modal}
          />
        ) : null}
      </div>
    );
}
