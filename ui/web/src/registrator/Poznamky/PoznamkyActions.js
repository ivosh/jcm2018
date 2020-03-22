import { API_ADD_POZNAMKA, API_DELETE_POZNAMKA, API_MODIFY_POZNAMKA } from 'ui-common/common';
import { WS_API } from 'ui-common/store/wsAPI';
import { AKTUALNI_ROK } from '../../constants';

const normalize = ({
  request,
  response: {
    response: { poznamky },
  },
}) => ({ request, response: { poznamky } });

export const POZNAMKA_ADD = 'POZNAMKA_ADD';
export const addPoznamka = ({ id, poznamka, rok = AKTUALNI_ROK }) => ({
  [WS_API]: {
    type: POZNAMKA_ADD,
    endpoint: API_ADD_POZNAMKA,
    normalize,
    request: {
      id,
      poznamka: {
        ...poznamka,
        datum:
          (poznamka.datum && (poznamka.datum.toJSON ? poznamka.datum.toJSON() : poznamka.datum)) ||
          new Date().toJSON(),
      },
      rok,
    },
    title: 'přidávání poznámky',
  },
});

export const POZNAMKA_DELETE = 'POZNAMKA_DELETE';
export const deletePoznamka = ({ id, index, rok = AKTUALNI_ROK }) => ({
  [WS_API]: {
    type: POZNAMKA_DELETE,
    endpoint: API_DELETE_POZNAMKA,
    normalize,
    request: { id, index, rok },
    title: 'mazání poznámky',
  },
});

export const POZNAMKA_MODIFY = 'POZNAMKA_MODIFY';
export const modifyPoznamka = ({ id, index, poznamka, rok = AKTUALNI_ROK }) => ({
  [WS_API]: {
    type: POZNAMKA_MODIFY,
    endpoint: API_MODIFY_POZNAMKA,
    normalize,
    request: {
      id,
      index,
      poznamka: {
        ...poznamka,
        datum: poznamka.datum.toJSON ? poznamka.datum.toJSON() : poznamka.datum,
      },
      rok,
    },
    title: 'ukládání poznámky',
  },
});
