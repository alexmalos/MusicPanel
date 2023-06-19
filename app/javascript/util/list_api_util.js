import axios from "axios";

export const fetchLists = () => (
    axios.get('/api/lists').then(response => response.data)
);

export const fetchList = id => (
    axios.get(`/api/lists/${id}`).then(response => response.data)
);

export const createList = data => (
    axios.post('/api/lists', data).then(response => response.data)
);

export const updateList = data => (
    axios.patch(`/api/lists/${data.id}`, data).then(response => response.data)
);

export const deleteList = id => (
    axios.delete(`/api/lists/${id}`).then(response => response.data)
);

export const createListItems = data => (
    axios.post('/api/list_items', data).then(response => response.data)
);
