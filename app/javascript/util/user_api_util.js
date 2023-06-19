import axios from "axios";

export const fetchUser = id => (
    axios.get(`/api/users/${id}`).then(response => response.data)
);

export const updateUser = (id, user) => (
    axios.patch(`/api/users/${id}`, { user }).then(response => response.data)
);
