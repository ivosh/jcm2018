import { API_SAVE_VYKON } from '../../../common';
import { AKTUALNI_ROK } from '../../../constants';
import { findDokonceno } from '../../../Util';
import { WS_API } from '../../../store/wsAPI';
import startovniCislaReducer from './startovniCislaReducer';

export const canDrop = ({ source, destination }) => {
  if (source.typ !== destination.typ) {
    return false;
  }

  const sourceDokonceno = findDokonceno(source.dokonceno);
  if (sourceDokonceno === destination.name || destination.name === 'dokonceno') {
    return false;
  }

  return true;
};

const startCisloDokonceno = ({ id, cas }) => ({
  type: 'START_CISLO_DOKONCENO',
  id,
  cas: cas.toJSON ? cas.toJSON() : cas
});
const startCisloNedokonceno = ({ id }) => ({ type: 'START_CISLO_NEDOKONCENO', id });
export const startCisloNaTrase = ({ id }) => ({ type: 'START_CISLO_NA_TRASE', id });

const createRequest = ({ action, id, rok, state, startCislo, typ }) => {
  const vykon = startovniCislaReducer(state.entities.ucastnici.byIds[id][rok].vykon, action);
  return { id, rok, startCislo, typ, vykon };
};

export const CASOMIRA_SAVE_VYKON = 'CASOMIRA_SAVE_VYKON';
export const saveVykon = ({ action, id, rok = AKTUALNI_ROK, startCislo, typ }) => ({
  [WS_API]: {
    type: CASOMIRA_SAVE_VYKON,
    endpoint: API_SAVE_VYKON,
    request: state => createRequest({ action, id, rok, startCislo, state, typ }),
    title: 'ukládání registrace na start'
  }
});

export const createDropAction = ({ source, destination }) => {
  const { id, startCislo } = source;
  const { cas, typ } = destination;
  if (destination.name === 'nedokonceno') {
    return saveVykon({ action: startCisloNedokonceno({ id }), id, startCislo, typ });
  }
  if (destination.name === 'na-trase') {
    return saveVykon({ action: startCisloNaTrase({ id }), id, startCislo, typ });
  }
  if (id && cas && (source.dokonceno === null || source.dokonceno === undefined)) {
    return saveVykon({ action: startCisloDokonceno({ id, cas }), id, startCislo, typ });
  }
  return undefined;
};
