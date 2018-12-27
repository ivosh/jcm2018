import { connect } from 'react-redux';
import AppDnD from './AppDnD';

const mapStateToProps = state => {
  const {
    auth,
    connected,
    timesync: { offset: timeOffset }
  } = state;

  return {
    authenticated: auth.authenticated,
    connected,
    timeOffset,
    username: (auth.decodedToken && auth.decodedToken.username) || null
  };
};

export default connect(
  mapStateToProps,
  null
)(AppDnD);
