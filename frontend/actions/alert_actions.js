export const OPEN_ALERT = 'OPEN_ALERT';
export const CLOSE_ALERT = 'CLOSE_ALERT';

export const openAlert = (review, alertType) => ({
    type: OPEN_ALERT,
    review,
    alertType
});

export const closeAlert = () => ({
    type: CLOSE_ALERT
});
