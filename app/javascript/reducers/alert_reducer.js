import {
    OPEN_ALERT,
    FIRE_ALERT,
    CLOSE_ALERT
} from '../actions/alert_actions';

export default (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case OPEN_ALERT:
            return [...state, action.alert];
        case FIRE_ALERT:
            const stateAlert = state.find(alert => alert === action.alert);
            return state.map(alert => {
                if (alert === stateAlert) {
                    return Object.assign({}, alert, { fired: true });
                } else return alert;
            });
        case CLOSE_ALERT:
            const stateAlertIndex = state.findIndex(alert => alert.review === action.alert.review && alert.alertType === action.alert.alertType);
            const newState = [...state];
            newState.splice(stateAlertIndex, 1);
            return newState;
        default:
            return state;
    }
};
