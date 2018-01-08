import { connect } from 'react-redux';
import App from './App';

const mapStateToProps = state => {
  const { auth, connected } = state;

  return {
    connected,
    username: (auth.decodedToken && auth.decodedToken.username) || '<nikdo>'
  };
};

export default connect(mapStateToProps, null)(App);
