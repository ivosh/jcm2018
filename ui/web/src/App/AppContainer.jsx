import { connect } from 'react-redux';
import AppDnD from './AppDnD';

const mapStateToProps = (state) => {
  const { auth, connected } = state;

  return {
    authenticated: auth.authenticated,
    connected,
    username: (auth.decodedToken && auth.decodedToken.username) || null,
  };
};

export default connect(mapStateToProps, null)(AppDnD);
