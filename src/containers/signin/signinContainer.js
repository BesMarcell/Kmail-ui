import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SigninComponent from '../../components/authentication/signin/SigninComponent';
import { signin } from '../../actions/account';

const mapStateToProps = ({account}) => (
  {account}
)

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    signin,
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(SigninComponent);
