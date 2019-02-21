import { AKTUALNI_ROK } from '../../constants';
import { SIGN_OUT } from '../../auth/SignOut/SignOutActions';
import { CASOMIRA_SAVE_VYKON } from '../../casomeric/Casomira/StartovniCisla/StartovniCislaActions';
import { POHAR_PREDAN } from '../../registrator/Pohary/PoharyActions';
import {
  DOHLASKY_SAVE,
  PRIHLASKY_SAVE
} from '../../registrator/PrihlaskyDohlasky/PrihlaskyForm/PrihlaskyFormActions';
import {
  STARTUJICI_CREATE_VYKON,
  STARTUJICI_DELETE_VYKON
} from '../../registrator/Startujici/StartujiciActions';
import { MODIFY_UBYTOVANI } from '../../registrator/Ubytovani/UbytovaniActions';
import { FETCH_UCASTNICI } from './ucastniciActions';

export const initialState = { allIds: [], byIds: {}, invalidated: false };

// První element je vždycky nejvyšší rok.
const addRokAndSort = (roky, rok) => [...roky, rok].sort((a, b) => b - a);

const updateUcast = (state, id, rok, name, obj) => {
  let { allIds, byIds } = state;

  let ucastnik = byIds[id];
  if (!ucastnik) {
    ucastnik = { roky: [] };
    allIds = [...allIds, id];
  }

  let ucast = ucastnik[rok];
  if (!ucast) {
    ucast = {};
    ucastnik = { ...ucastnik, roky: addRokAndSort(ucastnik.roky, rok) };
  }

  if (obj === undefined) {
    const { [name]: remove, ...rest } = ucast;
    ucast = { ...rest };
  } else {
    ucast = { ...ucast, [name]: obj };
  }
  ucastnik = { ...ucastnik, [rok]: ucast };
  byIds = { ...byIds, [id]: ucastnik };
  return { ...state, allIds, byIds };
};

const ucastniciReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BROADCAST_UCASTNIK': {
      const { id, roky, ...ucasti } = action.data;
      const updated = { ...state, byIds: { ...state.byIds, [id]: { roky, ...ucasti } } };
      return state.byIds[id] ? updated : { ...updated, allIds: [...updated.allIds, id] };
    }
    case `${CASOMIRA_SAVE_VYKON}_SUCCESS`: {
      const { id, rok, vykon } = action.request;
      return updateUcast(state, id, rok, 'vykon', vykon);
    }
    case `${FETCH_UCASTNICI}_SUCCESS`: {
      const { allIds, byIds } = action.response;
      return { allIds, byIds, invalidated: false };
    }
    case `${POHAR_PREDAN}_SUCCESS`: {
      const { id } = action.request;
      const ucastnik = state.byIds[id];
      const { pohar } = ucastnik;
      const predano = ((pohar && pohar.predano) || 0) + 1;
      return {
        ...state,
        byIds: { ...state.byIds, [id]: { ...ucastnik, pohar: { ...pohar, predano } } }
      };
    }
    case `${DOHLASKY_SAVE}_SUCCESS`:
    case `${PRIHLASKY_SAVE}_SUCCESS`: {
      const { rok, udaje, prihlaska, platby, ubytovani } = action.request;
      const { id } = action.response;
      const state1 = updateUcast(state, id, rok, 'udaje', udaje);
      const state2 = updateUcast(state1, id, rok, 'prihlaska', prihlaska);
      const state3 = updateUcast(state2, id, rok, 'platby', platby);
      return updateUcast(state3, id, rok, 'ubytovani', ubytovani);
    }
    case `${SIGN_OUT}_SUCCESS`:
      return initialState;
    case `${STARTUJICI_CREATE_VYKON}_SUCCESS`: {
      const { id, rok, vykon } = action.request;
      return updateUcast(state, id, rok, 'vykon', vykon);
    }
    case `${STARTUJICI_DELETE_VYKON}_SUCCESS`: {
      const { id, rok } = action.request;
      return updateUcast(state, id, rok, 'vykon', undefined);
    }
    case `${MODIFY_UBYTOVANI}_SUCCESS`: {
      const {
        request: { id, rok },
        response: { ubytovani }
      } = action;
      return updateUcast(state, id, rok, 'ubytovani', ubytovani);
    }
    case 'WEBSOCKET_DISCONNECTED':
      return { ...state, invalidated: true };
    default:
      return state;
  }
};

export default ucastniciReducer;

export const getUcastiProRok = ({ ucastnici, rok = AKTUALNI_ROK }) => {
  const result = ucastnici.allIds.map(id => {
    const ucastnik = ucastnici.byIds[id];
    if (ucastnik.roky[0] === rok) {
      const ucast = ucastnik[rok];
      return { id, rok, ucast };
    }
    return undefined;
  });

  return result.filter(ucasti => ucasti !== undefined);
};
