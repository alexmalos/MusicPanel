export const fetchLists = () => (
    $.ajax({
        url: '/api/lists',
        method: 'GET'
    })
);

export const fetchList = id => (
    $.ajax({
        url: `/api/lists/${id}`,
        method: 'GET'
    })
);

export const createList = data => (
    $.ajax({
        url: '/api/lists',
        method: 'POST',
        dataType: 'json',
        data
    })
);

export const updateList = data => (
    $.ajax({
        url: `/api/lists/${data.list.id}`,
        method: 'PATCH',
        dataType: 'json',
        data
    })
);

export const deleteList = id => (
    $.ajax({
        url: `/api/lists/${id}`,
        method: 'DELETE'
    })
);

export const createListItems = data => (
    $.ajax({
        url: '/api/list_items',
        method: 'POST',
        dataType: 'json',
        data
    })
);
