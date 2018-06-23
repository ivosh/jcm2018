import { connect } from 'react-redux';
import SignIn from './SignIn';
import { hideError, signIn } from './SignInActions';

const mapStateToProps = state => {
  const { signingIn, errorCode, errorMessage, showError } = state.auth.signIn;

  return { signingIn, errorCode, errorMessage, showError };
};

const mapDispatchToProps = dispatch => ({
  onHideError: () => dispatch(hideError()),
  onSubmit: (username, password) => dispatch(signIn(username, password))
});

const SignInContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);

export default SignInContainer;
