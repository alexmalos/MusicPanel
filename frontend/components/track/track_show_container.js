import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';
import { fetchSong } from '../../actions/music_actions';
import TrackShow from './track_show';

const mapStateToProps = ({ session, ui, entities }, { match, location }) => ({
    trackId: parseInt(match.params.trackId),
    sessionId: session.id,
    path: location.pathname,
    modalType: ui.modal.modalType,
    entities
});

const mapDispatchToProps = dispatch => ({
    fetchTrack: id => dispatch(fetchSong(id)),
    openModal: (modal, data) => dispatch(openModal(modal, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackShow);
