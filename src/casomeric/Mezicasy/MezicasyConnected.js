import { connect } from 'react-redux';
import { naTrase } from '../Startujici/StartujiciActions';
import { getDokoncenoWithCisloClass } from '../Startujici/startujiciReducer';
import StartCisloBox from '../StartCislo/StartCisloBox';
import StartCisloInputConnected from '../StartCislo/StartCisloInputConnected';
import Mezicasy from './Mezicasy';
import { addMezicas, removeMezicas } from './MezicasyActions';
import { getMezicasyWithCisloClass } from './mezicasyReducer';

export const computeMezicasy = state => {
  const startujici = getDokoncenoWithCisloClass(state.startujici, StartCisloBox);
  const mezicasy = getMezicasyWithCisloClass(state.casomeric.mezicasy, StartCisloInputConnected);

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
