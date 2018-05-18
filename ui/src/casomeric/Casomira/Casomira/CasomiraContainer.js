import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { getUcastiProRok } from '../../../entities/ucastnici/ucastniciReducer';
import { getMezicasy, getStopkyByTyp } from '../../Stopky/StopkyProTyp/stopkyProTypReducer';
import { saveStopky, stopkyMezicas } from '../../Stopky/StopkyProTyp/StopkyProTypActions';
import Casomira from './Casomira';

const mapStateToProps = (state, ownProps) => {
  const { accessKey, typ, onRemoveCasomira } = ownProps;
  const stopky = getStopkyByTyp({ state, typ });
  const ucasti = getUcastiProRok({ ...state.entities });

  const mezicasy = getMezicasy({ stopky, ucasti, kategorie: state.entities.kategorie });
  const populated = mezicasy.map(mezicas => {
    const { cas, ...rest } = mezicas;
    return { ...rest, cas: moment.duration(cas) };
  });

  return {
    accessKey,
    base: new Date(stopky.base),
    delta: moment.duration(stopky.delta),
    mezicasEnabled: stopky.running === true,
    mezicasy: populated,
    running: stopky.running,
    typ,
    onRemoveCasomira
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
  onRemoveCasomira: PropTypes.func.isRequired
};

export default CasomiraContainer;
