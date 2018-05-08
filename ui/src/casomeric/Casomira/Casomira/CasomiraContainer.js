import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { getStopkyByTyp } from '../../Stopky/StopkyProTyp/stopkyProTypReducer';
import { stopkyMezicas } from './CasomiraActions';
import Casomira from './Casomira';

const mapStateToProps = (state, ownProps) => {
  const { typ, onRemove } = ownProps;
  const stopky = getStopkyByTyp({ state, typ });

  return {
    base: new Date(stopky.base),
    delta: moment.duration(stopky.delta),
    mezicasEnabled: stopky.running === true,
    running: stopky.running,
    typ,
    onRemove
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { typ } = ownProps;

  return {
    onStopkyMezicas: base => dispatch(stopkyMezicas({ base, typ }))
  };
};

const mergeProps = (stateProps, dispatchProps) => {
  const { base } = stateProps;
  const { onStopkyMezicas, ...restOfDispatchProps } = dispatchProps;

  return {
    ...stateProps,
    ...restOfDispatchProps,
    onStopkyMezicas: () => onStopkyMezicas(base)
  };
};

const CasomiraContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Casomira);

CasomiraContainer.propTypes = {
  typ: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default CasomiraContainer;
