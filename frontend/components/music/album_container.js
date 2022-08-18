import { connect } from 'react-redux';
import { fetchAlbum } from '../../actions/music_actions';
import Album from './album';

const mapStateToProps = ({ entities, session }, { match, location }) => ({
    albumId: parseInt(match.params.albumId),
    loggedIn: Boolean(session.id),
    path: location.pathname,
    entities
});

const mapDispatchToProps = dispatch => ({
    fetchAlbum: id => dispatch(fetchAlbum(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Album);
