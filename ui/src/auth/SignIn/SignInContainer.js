import { connect } from 'react-redux';
import SignIn from './SignIn';
import { signIn } from './SignInActions';

const mapStateToProps = state => state.auth.signIn;

const mapDispatchToProps = dispatch => ({
  onSubmit: (username, password) => dispatch(signIn(username, password))
});

const SignInContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);

export default SignInContainer;
