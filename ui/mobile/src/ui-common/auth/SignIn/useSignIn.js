import { signIn } from './SignInActions';
// :TODO: use React hooks when expo upgrades to SDK 33

export const mapStateToProps = (state) => state.auth.signIn;

export const mapDispatchToProps = (dispatch) => ({
  onSubmit: (username, password) => dispatch(signIn({ username, password })),
});
