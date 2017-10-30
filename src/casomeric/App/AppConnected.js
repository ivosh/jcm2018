import { connect } from 'react-redux';
import App from './App';
import { addMezicas } from '../Mezicasy/MezicasyActions';

const mapDispatchToProps = dispatch => ({
  onAddMezicas: duration => {
    dispatch(addMezicas(duration));
  }
});

export default connect(undefined, mapDispatchToProps)(App);
