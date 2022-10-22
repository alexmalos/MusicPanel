import { connect } from 'react-redux';
import { deleteList, fetchList, createList } from '../../actions/list_actions';
import { closeModal, openModal } from '../../actions/modal_actions';
import ListForm from './list_form';

const mapStateToProps = ({ session, entities }) => ({
    sessionId: session.id,
    entities,
    newForm: true
});

const mapDispatchToProps = dispatch => ({
    fetchList: id => dispatch(fetchList(id)),
    createList: data => dispatch(createList(data)),
    deleteList: id => dispatch(deleteList(id)),
    openModal: (modal, data) => dispatch(openModal(modal, data)),
    closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(ListForm);
