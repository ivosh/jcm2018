import { connect } from 'react-redux';
import moment from 'moment';
import StartCisloBox from '../StartCislo/StartCisloBox';
import StartCisloInputConnected from '../StartCislo/StartCisloInputConnected';
import Mezicasy from './Mezicasy';
import { addMezicas, removeMezicas } from './MezicasyActions';
import { naTrase } from '../Startujici/StartujiciActions';

export const computeMezicasy = state => {
  const na_trase = state.startujici.filter(startujici => {
    return startujici.dokonceno === true;
  });
  const startujici = na_trase.map(startujici => {
    return {
      id: startujici.id,
      duration: moment.duration(startujici.duration),
      cislo: startujici.cislo,
      cisloClass: StartCisloBox
    };
  });

  const mezicasy = state.mezicasy.map(mezicas => {
    return {
      ...mezicas,
      duration: moment.duration(mezicas.duration),
      cisloClass: StartCisloInputConnected
    };
  });

  let dohromady = startujici.concat(mezicasy);
  return dohromady.sort((a, b) => {
    return a.duration.valueOf() - b.duration.valueOf();
  });
};

const mapStateToProps = state => ({
  mezicasy: computeMezicasy(state)
});

const mapDispatchToProps = dispatch => ({
  onRemoveMezicas: id => {
    dispatch(removeMezicas(id));
  },
  onRemoveCislo: (id, duration) => {
    dispatch(naTrase(id));
    dispatch(addMezicas(duration));
  }
});

const mergeProps = (stateProps, dispatchProps) => ({
  mezicasy: stateProps.mezicasy.map(mezicas => {
    return {
      ...mezicas,
      onRemove: () =>
        mezicas.cislo
          ? dispatchProps.onRemoveCislo(mezicas.id, mezicas.duration)
          : dispatchProps.onRemoveMezicas(mezicas.id)
    };
  })
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Mezicasy);
