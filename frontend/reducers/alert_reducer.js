import {
    OPEN_ALERT,
    CLOSE_ALERT
} from '../actions/alert_actions';

export default (state = null, { type, review, alertType }) => {
    switch (type) {
        case OPEN_ALERT:
            return { review, alertType };
        case CLOSE_ALERT:
            return null;
        default:
            return state;
    }
};
