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
  err,
  receivedAt: Date.now()
});
