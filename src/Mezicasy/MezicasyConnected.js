import React from 'react';
import { connect } from 'react-redux';
import StartCisloInputConnected from '../StartCislo/StartCisloInputConnected';
import Mezicasy from './Mezicasy';
import { removeMezicas } from './MezicasyActions';

const Span = props => <span>{props.cislo}</span>;

export const computeMezicasy = state => {
  const na_trase = state.startujici.filter(startujici => {
    return startujici.dokonceno === true;
  });
  const startujici = na_trase.map(startujici => {
    return {
      id: startujici.id,
      duration: startujici.duration,
      cislo: startujici.cislo,
      cisloClass: Span
    };
  });

  const mezicasy = state.mezicasy.map(mezicas => {
    return { ...mezicas, cisloClass: StartCisloInputConnected };
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Mezicasy);
