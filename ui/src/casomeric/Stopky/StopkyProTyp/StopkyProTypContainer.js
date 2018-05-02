import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { getCudly } from './stopkyProTypReducer';
import {
  getStopkyByTyp,
  saveStopky,
  stopkyStart,
  stopkyStop,
  stopkyChange
} from './StopkyProTypActions';
import StopkyProTyp from './StopkyProTyp';

const mapStateToProps = (state, ownProps) => {
  const { typ } = ownProps;
  const cudly = getCudly();
  const stopky = getStopkyByTyp({ state, typ });

  return {
    base: new Date(stopky.base),
    cudly,
    delta: moment.duration(stopky.delta),
    running: stopky.running,
    startEnabled: stopky.running === false,
    stopEnabled: stopky.running === true,
    typ
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { typ } = ownProps;

  return {
    onStart: () => dispatch(saveStopky({ action: stopkyStart(), typ })),
    onStop: () => dispatch(saveStopky({ action: stopkyStop(), typ })),
    onChange: step => dispatch(saveStopky({ action: stopkyChange({ step }), typ }))
  };
};

const mergeProps = (stateProps, dispatchProps) => {
  const { cudly, ...restOfStateProps } = stateProps;
  const { onChange, ...restOfDispatchProps } = dispatchProps;

  return {
    cudly: cudly.map(cudl => ({ ...cudl, onClick: () => onChange(cudl.step) })),
    ...restOfStateProps,
    ...restOfDispatchProps
  };
};

const StopkyProTypContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  StopkyProTyp
);

StopkyProTypContainer.propTypes = {
  typ: PropTypes.string.isRequired
};

export default StopkyProTypContainer;
