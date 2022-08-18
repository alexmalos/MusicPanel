import { connect } from 'react-redux';
import { fetchAlbum, fetchArtist, fetchTracks } from '../../actions/music_actions';
import Album from './album';

const mapStateToProps = ({ entities, session }, { match, location }) => ({
    albumId: parseInt(match.params.albumId),
    loggedIn: Boolean(session.id),
    path: location.pathname,
    entities
});

const mapDispatchToProps = dispatch => ({
    fetchAlbum: id => dispatch(fetchAlbum(id)),
    fetchArtist: id => dispatch(fetchArtist(id)),
    fetchTracks: albumId => dispatch(fetchTracks(albumId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Album);
