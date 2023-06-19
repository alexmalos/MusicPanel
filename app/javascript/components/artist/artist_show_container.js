import { connect } from "react-redux";
import { openModal } from "../../actions/modal_actions";
import { fetchArtist } from "../../actions/music_actions";
import ArtistShow from "./artist_show";

const mapStateToProps = ({ session, ui, entities }) => ({
  sessionId: session.id,
  modalType: ui.modal.modalType,
  entities
});

const mapDispatchToProps = dispatch => ({
  fetchArtist: id => dispatch(fetchArtist(id)),
  openModal: (modal, data) => dispatch(openModal(modal, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistShow);
