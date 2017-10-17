import { connect } from 'react-redux';
import StopkyView from './StopkyView';
import { stopkyStart, stopkyStop } from './StopkyActions';

const mapStateToProps = state => ({
  base: state.stopky.base,
  running: state.stopky.running,
  startDisabled: state.stopky.running === true,
  stopDisabled: state.stopky.running === false
});

const mapDispatchToProps = dispatch => {
  return {
    startAction: base => {
      dispatch(stopkyStart(base));
    },
    stopAction: () => {
      dispatch(stopkyStop());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StopkyView);
