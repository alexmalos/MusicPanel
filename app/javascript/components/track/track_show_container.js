import { connect } from "react-redux";
import { openModal } from "../../actions/modal_actions";
import { fetchTrack } from "../../actions/music_actions";
import TrackShow from "./track_show";

const mapStateToProps = ({ session, ui, entities }) => ({
  sessionId: session.id,
  modalType: ui.modal.modalType,
  entities,
});

const mapDispatchToProps = dispatch => ({
  fetchTrack: id => dispatch(fetchTrack(id)),
  openModal: (modal, data) => dispatch(openModal(modal, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackShow);
