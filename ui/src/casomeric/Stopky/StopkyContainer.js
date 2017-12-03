import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Stopky from './Stopky';
import { stopkyStart, stopkyStop } from './StopkyActions';

const mapStateToProps = ({ casomeric }) => ({
  base: new Date(casomeric.stopky.base),
  running: casomeric.stopky.running,
  startEnabled: casomeric.stopky.running === false,
  mezicasEnabled: casomeric.stopky.running === true,
  stopEnabled: casomeric.stopky.running === true
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
