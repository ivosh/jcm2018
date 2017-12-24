import { connect } from 'react-redux';
import App from './App';

const mapStateToProps = state => ({
  connected: state.connected
});

export default connect(mapStateToProps, null)(App);
