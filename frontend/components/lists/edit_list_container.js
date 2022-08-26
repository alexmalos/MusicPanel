import { connect } from 'react-redux';
import { fetchList } from '../../actions/list_actions';
import { openModal } from '../../actions/modal_actions';
import EditList from './edit_list';

const mapStateToProps = ({ session, entities }, { match }) => ({
    listId: parseInt(match.params.listId),
    sessionId: session.id,
    entities
});

const mapDispatchToProps = dispatch => ({
    fetchList: id => dispatch(fetchList(id)),
    openModal: (modal, data) => dispatch(openModal(modal, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditList);
