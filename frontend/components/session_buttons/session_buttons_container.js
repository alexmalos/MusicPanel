import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';
import { openDropdown, closeDropdown } from '../../actions/dropdown_actions';
import SessionButtons from './session_buttons';

const mapStateToProps = ({entities: { users }, session, ui}) => ({
    currentUser: users[session.id],
    dropdown: ui.dropdown
});

const mapDispatchToProps = dispatch => ({
  openModal: modal => dispatch(openModal(modal)),
  openDropdown: dropdown => dispatch(openDropdown(dropdown)),
  closeDropdown: () => dispatch(closeDropdown())
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionButtons);
