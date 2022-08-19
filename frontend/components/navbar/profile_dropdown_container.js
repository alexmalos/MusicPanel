import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import ProfileDropdown from './profile_dropdown';

const mapStateToProps = ({entities: { users }, session}) => ({
    currentUser: users[session.id]
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDropdown);
