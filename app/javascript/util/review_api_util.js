import axios from "axios";

export const fetchReviews = () => (
    axios.get('/api/reviews').then(response => response.data)
);

export const fetchReview = id => (
    axios.get(`/api/reviews/${id}`).then(response => response.data)
);

export const createReview = review => (
    axios.post('/api/reviews', { review }).then(response => response.data)
);

export const updateReview = review => (
    axios.patch(`/api/reviews/${review.id}`, { review }).then(response => response.data)
);

export const deleteReview = id => (
    axios.delete(`/api/reviews/${id}`).then(response => response.data)
);
