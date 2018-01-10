import { connect } from 'react-redux';
import SignOut from './SignOut';
import { signOut } from './SignOutActions';

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut())
});

const SignOutContainer = connect(null, mapDispatchToProps)(SignOut);

export default SignOutContainer;
