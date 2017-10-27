import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Stopky from './Stopky';
import { stopkyStart, stopkyStop } from './StopkyActions';

const mapStateToProps = state => ({
  base: new Date(state.stopky.base),
  running: state.stopky.running,
  startEnabled: state.stopky.running === false,
  mezicasEnabled: state.stopky.running === true,
  stopEnabled: state.stopky.running === true
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onStart: base => {
    dispatch(stopkyStart(base));
  },
  onStop: () => {
    dispatch(stopkyStop());
  },
  onAddMezicas: ownProps.onAddMezicas
});

const StopkyConnected = connect(mapStateToProps, mapDispatchToProps)(Stopky);

StopkyConnected.propTypes = {
  onAddMezicas: PropTypes.func.isRequired
};

export default StopkyConnected;
