import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { updateReview } from '../../actions/review_actions';
import { deleteReview } from '../../actions/review_actions';
import ReviewForm from './review_form';

const mapStateToProps = ({ entities }) => ({
    entities
});

const mapDispatchToProps = dispatch => ({
    processForm: review => {
        dispatch(updateReview(review));
        dispatch(closeModal());
    },
    deleteReview: id => {
        dispatch(deleteReview(id));
        dispatch(closeModal());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
