import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';
import { fetchSong } from '../../actions/music_actions';
import TrackShow from './track_show';

const mapStateToProps = ({ session }, { match, location }) => ({
    trackId: parseInt(match.params.trackId),
    loggedIn: Boolean(session.id),
    path: location.pathname
});

const mapDispatchToProps = dispatch => ({
    fetchTrack: id => dispatch(fetchSong(id)),
    openLoginModal: () => dispatch(openModal('login'))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackShow);
