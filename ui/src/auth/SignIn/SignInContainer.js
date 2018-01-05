import { connect } from 'react-redux';
import SignIn from './SignIn';
import { signIn } from './SignInActions';

const mapDispatchToProps = dispatch => ({
  onSubmit: (username, password) => dispatch(signIn(username, password))
});

const SignInContainer = connect(null, mapDispatchToProps)(SignIn);

export default SignInContainer;
