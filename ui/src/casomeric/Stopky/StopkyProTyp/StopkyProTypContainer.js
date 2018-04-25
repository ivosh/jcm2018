import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { stopkyAdd, stopkyStart, stopkyStop, stopkySub } from './StopkyProTypActions';
import StopkyProTyp from './StopkyProTyp';

const mapStateToProps = ({ casomeric }, ownProps) => {
  const { typ } = ownProps;
  const { stopky } = casomeric[typ];

  return {
    base: new Date(stopky.base),
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
    onStart: () => dispatch(stopkyStart({ typ })),
    onStop: () => dispatch(stopkyStop({ typ })),
    onAdd: [
      () => dispatch(stopkyAdd({ step: 10 * 60 * 60 * 1000, typ })),
      () => dispatch(stopkyAdd({ step: 1 * 60 * 60 * 1000, typ })),
      () => dispatch(stopkyAdd({ step: 10 * 60 * 1000, typ })),
      () => dispatch(stopkyAdd({ step: 1 * 60 * 1000, typ })),
      () => dispatch(stopkyAdd({ step: 10 * 1000, typ })),
      () => dispatch(stopkyAdd({ step: 1 * 1000, typ })),
      () => dispatch(stopkyAdd({ step: 100, typ })),
      () => dispatch(stopkyAdd({ step: 10, typ }))
    ],
    onSub: [
      () => dispatch(stopkySub({ step: 10 * 60 * 60 * 1000, typ })),
      () => dispatch(stopkySub({ step: 1 * 60 * 60 * 1000, typ })),
      () => dispatch(stopkySub({ step: 10 * 60 * 1000, typ })),
      () => dispatch(stopkySub({ step: 1 * 60 * 1000, typ })),
      () => dispatch(stopkySub({ step: 10 * 1000, typ })),
      () => dispatch(stopkySub({ step: 1 * 1000, typ })),
      () => dispatch(stopkySub({ step: 100, typ })),
      () => dispatch(stopkySub({ step: 10, typ }))
    ]
  };
};

const StopkyProTypContainer = connect(mapStateToProps, mapDispatchToProps)(StopkyProTyp);

StopkyProTypContainer.propTypes = {
  typ: PropTypes.string.isRequired
};

export default StopkyProTypContainer;
