import {
  API_SAVE_UBYTOVANI,
  UBYTOVANI_NEPRESPANO,
  UBYTOVANI_ODHLASIT,
  UBYTOVANI_PRIHLASIT,
  UBYTOVANI_PRESPANO,
  ubytovaniModifications
} from '../../common';
import { AKTUALNI_ROK } from '../../constants';
import { WS_API } from '../../store/wsAPI';

export const changeUbytovani = () => ({
  type: 'UBYTOVANI_CHANGE_UBYTOVANI'
});

export const hideError = () => ({ type: 'UBYTOVANI_HIDE_ERROR' });
export const showError = () => ({ type: 'UBYTOVANI_SHOW_ERROR' });

const reducers = {
  Nepřespáno: UBYTOVANI_NEPRESPANO,
  Odhlásit: UBYTOVANI_ODHLASIT,
  Přespáno: UBYTOVANI_PRESPANO,
  Přihlásit: UBYTOVANI_PRIHLASIT
};

const createRequest = ({ akce, den, id, rok, state }) => {
  const reducer = ubytovaniModifications[reducers[akce]];
  const ubytovani = reducer({ den, ubytovani: state.entities.ucastnici.byIds[id][rok].ubytovani });
  return { id, rok, ubytovani };
};

const normalize = ({ request }) => ({ request, response: {} });

export const SAVE_UBYTOVANI = 'SAVE_UBYTOVANI';
export const saveUbytovani = ({ akce, den = 'pátek', id, rok = AKTUALNI_ROK }) => ({
  [WS_API]: {
    type: SAVE_UBYTOVANI,
    endpoint: API_SAVE_UBYTOVANI,
    normalize,
    request: state => createRequest({ akce, den, id, rok, state }),
    title: 'ukládání ubytování'
  }
});
