export const OPEN_ALERT = 'OPEN_ALERT';
export const FIRE_ALERT = 'FIRE_ALERT';
export const CLOSE_ALERT = 'CLOSE_ALERT';

export const openAlert = alert => ({
    type: OPEN_ALERT,
    alert
});

export const fireAlert = alert => ({
    type: FIRE_ALERT,
    alert
});

export const closeAlert = alert => ({
    type: CLOSE_ALERT,
    alert
});
