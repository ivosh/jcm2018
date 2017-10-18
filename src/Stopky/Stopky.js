import { connect } from 'react-redux';
import StopkyView from './StopkyView';
import { stopkyStart, stopkyStop } from './StopkyActions';
import { addMezicas } from '../Mezicasy/MezicasyActions';

const mapStateToProps = state => ({
  base: state.stopky.base,
  running: state.stopky.running,
  startEnabled: state.stopky.running === false,
  mezicasEnabled: state.stopky.running === true,
  stopEnabled: state.stopky.running === true
});

const mapDispatchToProps = dispatch => ({
  onStart: base => {
    dispatch(stopkyStart(base));
  },
  onStop: () => {
    dispatch(stopkyStop());
  },
  onMezicas: duration => {
    dispatch(addMezicas(duration));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(StopkyView);
