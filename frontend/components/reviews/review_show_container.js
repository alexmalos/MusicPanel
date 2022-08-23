import { connect } from 'react-redux';
import { fetchReview } from '../../actions/review_actions';
import ReviewShow from './review_show';

const mapStateToProps = ({ session, ui, entities }, { match, location }) => ({
    reviewId: parseInt(match.params.reviewId),
    sessionId: session.id,
    modalType: ui.modal.modalType,
    entities
});

const mapDispatchToProps = dispatch => ({
    fetchReview: id => dispatch(fetchReview(id)),
    openModal: (modal, data) => dispatch(openModal(modal, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewShow);
