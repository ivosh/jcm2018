import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { getCudly, getRozdily, getStopkyByTyp } from './stopkyProTypReducer';
import { stopkyReset, stopkyStart, stopkyStop, stopkyChangeTime } from './StopkyProTypActions';
import StopkyProTyp from './StopkyProTyp';

const mapStateToProps = (state, ownProps) => {
  const { typ } = ownProps;
  const cudly = getCudly();
  const rozdily = getRozdily({ state, typ });
  const { base, delta, running } = getStopkyByTyp({ state, typ });

  return {
    base: new Date(base),
    cudly,
    delta: moment.duration(delta),
    rozdily,
    running,
    startEnabled: running === false,
    stopEnabled: running === true,
    typ,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { typ } = ownProps;

  return {
    onReset: () => dispatch(stopkyReset({ typ })),
    onStart: () => dispatch(stopkyStart({ typ })),
    onStop: () => dispatch(stopkyStop({ typ })),
    onChange: (step) => dispatch(stopkyChangeTime({ step, typ })),
  };
};

const mergeProps = (stateProps, dispatchProps) => {
  const { cudly, ...restOfStateProps } = stateProps;
  const { onChange, ...restOfDispatchProps } = dispatchProps;

  return {
    cudly: cudly.map((cudl) => ({ ...cudl, onClick: () => onChange(cudl.step) })),
    ...restOfStateProps,
    ...restOfDispatchProps,
  };
};

const StopkyProTypContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(StopkyProTyp);

StopkyProTypContainer.propTypes = {
  typ: PropTypes.string.isRequired,
};

export default StopkyProTypContainer;
