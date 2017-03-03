import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Signup from '../../components/authentication/signup/SignupComponent';
import { signup } from '../../actions/account';

const mapStateToProps = ({account}) => (
  {account}
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    signup
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
