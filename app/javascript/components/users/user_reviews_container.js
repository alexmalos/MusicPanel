import { connect } from "react-redux";
import { fetchUser } from "../../actions/user_actions";
import UserReviews from "./user_reviews";

const mapStateToProps = ({ session, entities }) => ({
  sessionId: session.id,
  entities
});

const mapDispatchToProps = dispatch => ({
  fetchUser: id => dispatch(fetchUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserReviews);
