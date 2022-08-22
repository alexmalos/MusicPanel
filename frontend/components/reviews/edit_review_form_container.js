import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { fetchReview, updateReview } from '../../actions/review_actions';
import ReviewForm from './review_form';

const mapStateToProps = ({ entities }) => ({
    entities,
    review: entities.reviews
});

const mapDispatchToProps = dispatch => ({
    fetchReview: id => dispatch(fetchReview(id)),
    processForm: review => {
        dispatch(updateReview(review));
        dispatch(closeModal());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
