import { connect } from "react-redux";
import { deleteList, fetchList, updateList } from "../../actions/list_actions";
import { closeModal, openModal } from "../../actions/modal_actions";
import { openAlert } from "../../actions/alert_actions";
import ListForm from "./list_form";

const mapStateToProps = ({ session, entities, ui }) => ({
  sessionId: session.id,
  entities,
  newForm: false,
  modalType: ui.modal.modalType
});

const mapDispatchToProps = dispatch => ({
  fetchList: id => dispatch(fetchList(id)),
  updateList: data => dispatch(updateList(data)),
  deleteList: id => {
    dispatch(deleteList(id));
    dispatch(closeModal());
  },
  openModal: (modal, data) => dispatch(openModal(modal, data)),
  closeModal: () => dispatch(closeModal()),
  openAlert: data => dispatch(openAlert(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListForm);
