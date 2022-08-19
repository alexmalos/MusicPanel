import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';
import { fetchAlbum } from '../../actions/music_actions';
import AlbumShow from './album_show';

const mapStateToProps = ({ entities, session }, { match, location }) => ({
    albumId: parseInt(match.params.albumId),
    loggedIn: Boolean(session.id),
    path: location.pathname,
    entities
});

const mapDispatchToProps = dispatch => ({
    fetchAlbum: id => dispatch(fetchAlbum(id)),
    openLoginModal: () => dispatch(openModal('login'))
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumShow);
