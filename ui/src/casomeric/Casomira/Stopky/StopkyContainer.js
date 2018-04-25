import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import Stopky from './Stopky';

const mapStateToProps = ({ casomeric: { maraton } }) => ({
  base: new Date(maraton.stopky.base),
  delta: moment.duration(maraton.stopky.delta),
  running: maraton.stopky.running,
  mezicasEnabled: maraton.stopky.running === true
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onAddMezicas: ownProps.onAddMezicas
});

const StopkyContainer = connect(mapStateToProps, mapDispatchToProps)(Stopky);

StopkyContainer.propTypes = {
  onAddMezicas: PropTypes.func.isRequired
};

export default StopkyContainer;
