import { connect } from 'react-redux';
import { signIn } from 'ui-common/auth/SignIn/SignInActions';
import SignIn from './SignIn';

const mapStateToProps = state => state.auth.signIn;

const mapDispatchToProps = dispatch => ({
  onSubmit: (username, password) => dispatch(signIn({ username, password }))
});

const SignInContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);

export default SignInContainer;
