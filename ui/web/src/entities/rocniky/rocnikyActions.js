import { API_FIND_ALL_ROCNIKY } from 'ui-common/common';
import { WS_API } from 'ui-common/store/wsAPI';
import { AKTUALNI_ROK } from '../../constants';

const decorate = (json) => ({
  getDatumKonani: (rok = AKTUALNI_ROK) => json.response.rocniky[rok].datum,
});

const normalize = ({
  request,
  response: {
    response: { kategorie, rocniky: byRoky },
  },
}) => ({
  request,
  response: {
    kategorie,
    rocniky: { byRoky, roky: Object.keys(byRoky).map((value) => parseInt(value, 10)) },
  },
});

const takeFromCache = ({ entities: { rocniky } }) =>
  rocniky && rocniky.roky && rocniky.roky.length > 0;

export const FETCH_ROCNIKY = 'FETCH_ROCNIKY';
export const fetchRocniky = () => ({
  [WS_API]: {
    type: FETCH_ROCNIKY,
    decorate,
    endpoint: API_FIND_ALL_ROCNIKY,
    normalize,
    takeFromCache,
    title: 'načítání ročníků',
  },
});
