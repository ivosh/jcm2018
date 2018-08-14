import { API_DELETE_VYKON, API_SAVE_VYKON } from '../../common';
import { AKTUALNI_ROK } from '../../constants';
import { WS_API } from '../../store/wsAPI';

const createVykonData = ({ id, rok, state }) => {
  const { kategorie, startCislo } = state.entities.ucastnici.byIds[id][rok].prihlaska;
  const vykon = { dokonceno: null, kategorie, startCislo };

  return { id, rok, vykon };
};

export const STARTUJICI_CREATE_VYKON = 'STARTUJICI_CREATE_VYKON';
export const createVykon = ({ id, rok = AKTUALNI_ROK }) => ({
  [WS_API]: {
    type: STARTUJICI_CREATE_VYKON,
    endpoint: API_SAVE_VYKON,
    request: state => createVykonData({ id, rok, state }),
    title: 'vytváření registrace na start'
  }
});

export const STARTUJICI_DELETE_VYKON = 'STARTUJICI_DELETE_VYKON';
export const deleteVykon = ({ id, rok = AKTUALNI_ROK }) => ({
  [WS_API]: {
    type: STARTUJICI_DELETE_VYKON,
    endpoint: API_DELETE_VYKON,
    request: { id, rok },
    title: 'rušení registrace na start'
  }
});
