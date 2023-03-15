import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';
import UserLists from './user_lists';

const mapStateToProps = ({ session, entities }, { match }) => ({
    userId: parseInt(match.params.userId),
    sessionId: session.id,
    entities
});

const mapDispatchToProps = dispatch => ({
    fetchUser: id => dispatch(fetchUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLists);
