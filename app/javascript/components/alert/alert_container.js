import { connect } from 'react-redux';
import { closeAlert, fireAlert } from '../../actions/alert_actions';
import Alert from './alert';

const mapStateToProps = ({ entities, ui }) => ({
    alerts: ui.alerts,
    entities

});

const mapDispatchToProps = dispatch => ({
    fireAlert: alert => dispatch(fireAlert(alert)),
    closeAlert: alert => dispatch(closeAlert(alert))
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
