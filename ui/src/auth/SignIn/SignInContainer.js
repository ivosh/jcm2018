import { connect } from 'react-redux';
import SignIn from './SignIn';
import { hideSignInError, signIn } from './SignInActions';

const mapStateToProps = state => {
  const { isSigningIn, errorCode, errorMessage, showError } = state.auth.signIn;

  return { isSigningIn, errorCode, errorMessage, showError };
};

const mapDispatchToProps = dispatch => ({
  onHideError: () => dispatch(hideSignInError()),
  onSubmit: (username, password) => dispatch(signIn(username, password))
});

const SignInContainer = connect(mapStateToProps, mapDispatchToProps)(SignIn);

export default SignInContainer;
