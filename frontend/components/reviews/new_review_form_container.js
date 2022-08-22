import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { createReview } from '../../actions/review_actions';
import ReviewForm from './review_form';

const mapStateToProps = ({ entities }) => ({
    entities,
    review: {
        rating: 0,
        pinned: false,
        private: false,
        title: '',
        body: ''
    }
});

const mapDispatchToProps = dispatch => ({
    processForm: review => {
        dispatch(createReview(review));
        dispatch(closeModal());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
