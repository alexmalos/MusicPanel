import { connect } from 'react-redux';
import MusicReviews from './music_reviews';

const mapStateToProps = ({ entities }) => ({
    users: entities.users
});

export default connect(mapStateToProps)(MusicReviews);
