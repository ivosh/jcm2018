import { saveVykon as saveVykonAPI, CODE_OK, CODE_TOKEN_INVALID } from '../../../common';
import { AKTUALNI_ROK } from '../../../constants';
import { errorToStr, findDokonceno } from '../../../Util';
import { authTokenExpired } from '../../../auth/SignIn/SignInActions';
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

export const saveVykonRequest = ({ id, rok, startCislo, typ }) => ({
  type: 'CASOMIRA_SAVE_VYKON_REQUEST',
  id,
  rok,
  startCislo,
  typ
});

export const saveVykonSuccess = ({ id, rok, startCislo, typ, vykon }) => ({
  type: 'CASOMIRA_SAVE_VYKON_SUCCESS',
  id,
  rok,
  startCislo,
  typ,
  vykon,
  receivedAt: Date.now()
});

// TODO: no component is subscribed to this action.
const saveVykonError = ({ code, status, err }, typ) => ({
  type: 'CASOMIRA_SAVE_VYKON_ERROR',
  code,
  status,
  err: errorToStr(err),
  typ,
  receivedAt: Date.now()
});

export const saveVykon = ({ action, id, rok = AKTUALNI_ROK, startCislo, typ }) => async (
  dispatch,
  getState,
  wsClient
) => {
  dispatch(saveVykonRequest({ id, rok, startCislo, typ }));

  const state = getState();
  const vykon = startovniCislaReducer(state.entities.ucastnici.byIds[id][rok].vykon, action);

  try {
    const response = await wsClient.sendRequest(saveVykonAPI({ id, rok, vykon }, state.auth.token));
    if (response.code === CODE_OK) {
      dispatch(saveVykonSuccess({ id, rok, startCislo, typ, vykon }));
    } else if (response.code === CODE_TOKEN_INVALID) {
      dispatch(authTokenExpired(response));
    } else {
      dispatch(saveVykonError(response, typ));
    }
  } catch (err) {
    dispatch(saveVykonError({ code: 'internal error', err }, typ));
  }
};

export const createDropAction = ({ source, destination }) => {
  const { id, startCislo } = source;
  const { cas, typ } = destination;
  if (destination.name === 'nedokonceno') {
    return saveVykon({ action: startCisloNedokonceno({ id }), id, startCislo, typ });
  } else if (destination.name === 'na-trase') {
    return saveVykon({ action: startCisloNaTrase({ id }), id, startCislo, typ });
  } else if (id && cas && (source.dokonceno === null || source.dokonceno === undefined)) {
    return saveVykon({ action: startCisloDokonceno({ id, cas }), id, startCislo, typ });
  }
  return undefined;
};
