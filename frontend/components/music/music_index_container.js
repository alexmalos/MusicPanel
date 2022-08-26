import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';
import { fetchArtists, fetchAlbums, fetchTracks } from '../../actions/music_actions';
import MusicIndex from './music_index';

const mapStateToProps = ({ ui, entities }) => ({
    modalType: ui.modal.modalType,
    entities
});

const mapDispatchToProps = dispatch => ({
    fetchArtists: () => dispatch(fetchArtists()),
    fetchAlbums: () => dispatch(fetchAlbums()),
    fetchTracks: () => dispatch(fetchTracks()),
    openModal: (modal, data) => dispatch(openModal(modal, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicIndex);
