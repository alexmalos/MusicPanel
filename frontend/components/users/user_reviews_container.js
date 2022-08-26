import { connect } from 'react-redux';
import { fetchUser, updateUser } from '../../actions/user_actions';
import UserReviews from './user_reviews';

const mapStateToProps = ({ session, entities }, { match }) => ({
    userId: parseInt(match.params.userId),
    sessionId: session.id,
    entities
});

const mapDispatchToProps = dispatch => ({
    fetchUser: id => dispatch(fetchUser(id)),
    processForm: (id, formData) => dispatch(updateUser(id, formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserReviews);
