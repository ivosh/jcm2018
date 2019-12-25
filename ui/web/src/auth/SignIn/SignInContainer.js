import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from 'ui-common/auth/SignIn/useSignIn';
import SignIn from './SignIn';

const SignInContainer = connect(mapStateToProps, mapDispatchToProps)(SignIn);

export default SignInContainer;
