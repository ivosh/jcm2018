import { connect } from 'react-redux';
import { signOut } from 'ui-common/auth/SignOut/SignOutActions';
import SignOut from './SignOut';

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut())
});

const SignOutContainer = connect(
  null,
  mapDispatchToProps
)(SignOut);

export default SignOutContainer;
