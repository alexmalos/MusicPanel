import { connect } from "react-redux";
import { fetchUser } from "../../actions/user_actions";
import { openModal } from "../../actions/modal_actions";
import { updateList } from "../../actions/list_actions";
import UserShow from "./user_show";

const mapStateToProps = ({ session, entities, ui }) => ({
  sessionId: session.id,
  modalType: ui.modal.modalType,
  entities
});

const mapDispatchToProps = dispatch => ({
  fetchUser: id => dispatch(fetchUser(id)),
  openModal: (modal, data) => dispatch(openModal(modal, data)),
  updateList: data => dispatch(updateList(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);
