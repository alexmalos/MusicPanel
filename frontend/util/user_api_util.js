export const fetchUser = id => (
    $.ajax({
        url: `/api/users/${id}`,
        method: 'GET'
    })
);

export const updateUser = (id, user) => (
    $.ajax({
        url: `/api/users/${id}`,
        method: 'PATCH',
        data: { user },
        contentType: false,
        processData: false
    })
);
