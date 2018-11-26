import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { getStopkyByTyp } from '../../Stopky/StopkyProTyp/stopkyProTypReducer';
import { stopkyAddMezicas } from '../../Stopky/StopkyProTyp/StopkyProTypActions';
import Casomira from './Casomira';

const mapStateToProps = (state, ownProps) => {
  const { accessKey, typ, onRemoveCasomira } = ownProps;
  const { base, delta, running } = getStopkyByTyp({ state, typ });

  return {
    accessKey,
    base: new Date(base),
    delta: moment.duration(delta),
    mezicasEnabled: running === true,
    running,
    typ,
    onRemoveCasomira
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { typ } = ownProps;

  return {
    onStopkyAddMezicas: () => dispatch(stopkyAddMezicas({ typ }))
  };
};

const CasomiraContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Casomira);

CasomiraContainer.propTypes = {
  accessKey: PropTypes.string.isRequired,
  typ: PropTypes.string.isRequired,
  onRemoveCasomira: PropTypes.func.isRequired
};

export default CasomiraContainer;
