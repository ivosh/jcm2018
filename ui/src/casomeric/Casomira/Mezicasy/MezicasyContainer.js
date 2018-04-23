import { connect } from 'react-redux';
import { startujiciNaTrase } from '../Startujici/StartujiciActions';
import { getDokoncenoWithCisloClass } from '../Startujici/startujiciReducer';
import StartCisloBox from '../StartCislo/StartCisloBox';
import StartCisloInputContainer from '../StartCislo/StartCisloInputContainer';
import Mezicasy from './Mezicasy';
import { addMezicas, removeMezicas } from './MezicasyActions';
import { getMezicasyWithCisloClass } from './mezicasyReducer';

export const computeMezicasy = ({ casomeric: { maraton } }) => {
  const startujici = getDokoncenoWithCisloClass(maraton.startujici, StartCisloBox);
  const mezicasy = getMezicasyWithCisloClass(maraton.mezicasy, StartCisloInputContainer);

  const dohromady = startujici.concat(mezicasy);
  return dohromady.sort((a, b) => a.duration.valueOf() - b.duration.valueOf());
};

const mapStateToProps = state => ({
  mezicasy: computeMezicasy(state)
});

const mapDispatchToProps = dispatch => ({
  onRemoveMezicas: ({ id }) => {
    dispatch(removeMezicas(id));
  },
  onRemoveCislo: ({ id, duration }) => {
    dispatch(startujiciNaTrase(id));
    dispatch(addMezicas(duration));
  }
});

const mergeProps = (stateProps, dispatchProps) => ({
  mezicasy: stateProps.mezicasy.map(mezicas => {
    const onRemove = mezicas.cislo ? dispatchProps.onRemoveCislo : dispatchProps.onRemoveMezicas;
    return {
      ...mezicas,
      onRemove: () => onRemove(mezicas)
    };
  })
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Mezicasy);
