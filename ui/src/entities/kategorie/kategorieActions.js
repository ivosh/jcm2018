import { errorToStr } from '../../Util';

export const fetchKategorieSuccess = json => ({
  type: 'FETCH_KATEGORIE_SUCCESS',
  data: json.response.kategorie,
  receivedAt: Date.now()
});

// TODO: no component is subscribed to this action.
export const fetchKategorieError = ({ code, status, err }) => ({
  type: 'FETCH_KATEGORIE_ERROR',
  code,
  status,
  err: errorToStr(err),
  receivedAt: Date.now()
});
