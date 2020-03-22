import { connect } from 'react-redux';
import { timesyncOperation, timesyncStart, timesyncStop } from './TimesyncActions';
import Timesync from './Timesync';

const mapStateToProps = ({ timesync: { running, offset: timeOffset } }) => ({
  startEnabled: running === false,
  stopEnabled: running === true,
  timeOffset,
});

const mapDispatchToProps = (dispatch) => ({
  onStart: async () => {
    await dispatch(timesyncStart());
    dispatch(timesyncOperation());
  },
  onStop: () => dispatch(timesyncStop()),
});

const TimesyncContainer = connect(mapStateToProps, mapDispatchToProps)(Timesync);

export default TimesyncContainer;
