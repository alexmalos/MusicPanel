import { connect } from "react-redux";
import { openModal } from "../../actions/modal_actions";
import { fetchAlbum } from "../../actions/music_actions";
import AlbumShow from "./album_show";

const mapStateToProps = ({ session, ui, entities }) => ({
  sessionId: session.id,
  path: location.pathname,
  modalType: ui.modal.modalType,
  entities
});

const mapDispatchToProps = dispatch => ({
  fetchAlbum: id => dispatch(fetchAlbum(id)),
  openModal: (modal, data) => dispatch(openModal(modal, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumShow);
