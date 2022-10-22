import * as APIUtil from '../util/list_api_util';
import { openAlert } from './alert_actions';

export const RECEIVE_LISTS = 'RECEIVE_LISTS';
export const RECEIVE_LIST = 'RECEIVE_LIST';
export const REMOVE_LIST = 'DELETE_LIST';

const receiveLists = ({ lists, artists, albums, tracks, users }) => ({
    type: RECEIVE_LISTS,
    lists,
    artists,
    albums,
    tracks,
    users
});

const receiveList = ({ list, artists, albums, tracks, user, listItems }) => ({
    type: RECEIVE_LIST,
    list,
    artists,
    albums,
    tracks,
    user,
    listItems
});

const removeList = ({ list, artists, albums, tracks, listItems }) => ({
    type: REMOVE_LIST,
    listId: list.id,
    artists,
    albums,
    tracks,
    listItems
});

export const fetchLists = () => dispatch => (
  APIUtil.fetchLists().then(data => (
    dispatch(receiveLists(data))
  ))
);

export const fetchList = id => dispatch => (
  APIUtil.fetchList(id).then(data => (
    dispatch(receiveList(data))
  ))
);

export const createList = data => dispatch => (
    APIUtil.createList(data).then(data => {
      dispatch(openAlert({
        list: data.list,
        alertType: 'newList',
        fired: false
      }));
    })
);

export const updateList = data => dispatch => (
  APIUtil.updateList(data).then(data => {
    dispatch(openAlert({
        list: data.list,
        alertType: 'editList',
        fired: false
    }));
  })
);

export const deleteList = id => dispatch => (
    APIUtil.deleteList(id).then(data => (
      dispatch(removeList(data))
    ))
);
