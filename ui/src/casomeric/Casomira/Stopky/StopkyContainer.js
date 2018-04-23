import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Stopky from './Stopky';
import { stopkyStart, stopkyStop } from './StopkyActions';

const mapStateToProps = ({ casomeric: { maraton } }) => ({
  base: new Date(maraton.stopky.base),
  running: maraton.stopky.running,
  startEnabled: maraton.stopky.running === false,
  mezicasEnabled: maraton.stopky.running === true,
  stopEnabled: maraton.stopky.running === true
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onStart: base => dispatch(stopkyStart(base)),
  onStop: () => dispatch(stopkyStop()),
  onAddMezicas: ownProps.onAddMezicas
});

const StopkyContainer = connect(mapStateToProps, mapDispatchToProps)(Stopky);

StopkyContainer.propTypes = {
  onAddMezicas: PropTypes.func.isRequired
};

export default StopkyContainer;
