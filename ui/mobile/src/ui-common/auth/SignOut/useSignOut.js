import { signOut } from './SignOutActions';

// :TODO: use React hooks when expo upgrades to SDK 33

export const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
});
