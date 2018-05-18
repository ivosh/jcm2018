import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { getStopkyByTyp } from '../../Stopky/StopkyProTyp/stopkyProTypReducer';
import { saveStopky, stopkyAddMezicas } from '../../Stopky/StopkyProTyp/StopkyProTypActions';
import Casomira from './Casomira';

const mapStateToProps = (state, ownProps) => {
  const { accessKey, typ, onRemoveCasomira } = ownProps;
  const stopky = getStopkyByTyp({ state, typ });

  return {
    accessKey,
    base: new Date(stopky.base),
    delta: moment.duration(stopky.delta),
    mezicasEnabled: stopky.running === true,
    running: stopky.running,
    typ,
    onRemoveCasomira
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { typ } = ownProps;

  return {
    onStopkyAddMezicas: () => dispatch(saveStopky({ action: stopkyAddMezicas(), typ }))
  };
};

const CasomiraContainer = connect(mapStateToProps, mapDispatchToProps)(Casomira);

CasomiraContainer.propTypes = {
  accessKey: PropTypes.string.isRequired,
  typ: PropTypes.string.isRequired,
  onRemoveCasomira: PropTypes.func.isRequired
};

export default CasomiraContainer;
