import { API_MODIFY_UBYTOVANI } from '../../common';
import { AKTUALNI_ROK } from '../../constants';
import { WS_API } from '../../store/wsAPI';

export const changeUbytovaniFilter = () => ({
  type: 'UBYTOVANI_CHANGE_FILTER'
});

export const hideError = () => ({ type: 'UBYTOVANI_HIDE_ERROR' });
export const showError = () => ({ type: 'UBYTOVANI_SHOW_ERROR' });

const normalize = ({
  request,
  response: {
    response: { ubytovani }
  }
}) => ({ request, response: { ubytovani } });

export const MODIFY_UBYTOVANI = 'MODIFY_UBYTOVANI';
export const modifyUbytovani = ({ den = 'pátek', id, modifikace, rok = AKTUALNI_ROK }) => ({
  [WS_API]: {
    type: MODIFY_UBYTOVANI,
    endpoint: API_MODIFY_UBYTOVANI,
    normalize,
    request: { den, id, modifikace, rok },
    title: 'ukládání ubytování'
  }
});
