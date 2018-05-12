import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { getStopkyByTyp } from '../../Stopky/StopkyProTyp/stopkyProTypReducer';
import { saveStopky, stopkyMezicas } from '../../Stopky/StopkyProTyp/StopkyProTypActions';
import Casomira from './Casomira';

const mapStateToProps = (state, ownProps) => {
  const { accessKey, typ, onRemove } = ownProps;
  const stopky = getStopkyByTyp({ state, typ });

  return {
    accessKey,
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
    onStopkyMezicas: () => dispatch(saveStopky({ action: stopkyMezicas(), typ }))
  };
};

const CasomiraContainer = connect(mapStateToProps, mapDispatchToProps)(Casomira);

CasomiraContainer.propTypes = {
  accessKey: PropTypes.string.isRequired,
  typ: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default CasomiraContainer;
