import { connect } from 'react-redux';
import { closeAlert } from '../../actions/alert_actions';
import Alert from './alert';

const mapStateToProps = ({ entities, ui }) => ({
    alertType: ui.alert.alertType,
    review: ui.alert.review,
    entities

});

const mapDispatchToProps = dispatch => ({
  closeAlert: () => dispatch(closeAlert())
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
