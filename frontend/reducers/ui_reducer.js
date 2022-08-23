import { combineReducers } from 'redux';
import modal from './modal_reducer';
import alerts from './alert_reducer';

export default combineReducers({
  modal,
  alerts
});
