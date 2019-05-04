import { connect } from 'react-redux';
import { mapDispatchToProps } from 'ui-common/auth/SignOut/useSignOut';
import SignOut from './SignOut';

const SignOutContainer = connect(
  null,
  mapDispatchToProps
)(SignOut);

export default SignOutContainer;
