import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Sidebar from '../../components/SidebarComponent';
import { signout, fetch } from '../../actions/account';

const mapStateToProps = ({account}) => ({
  account
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    signout, fetch
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
