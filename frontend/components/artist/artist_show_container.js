import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';
import { fetchArtist } from '../../actions/music_actions';
import ArtistShow from './artist_show';

const mapStateToProps = ({ session, ui }, { match, location }) => ({
    artistId: parseInt(match.params.artistId),
    sessionId: session.id,
    path: location.pathname,
    modalType: ui.modal.modalType
});

const mapDispatchToProps = dispatch => ({
    fetchArtist: id => dispatch(fetchArtist(id)),
    openModal: (modal, data) => dispatch(openModal(modal, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistShow);
