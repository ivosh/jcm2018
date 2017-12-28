export const receiveKategorie = json => ({
  type: 'RECEIVE_KATEGORIE',
  data: json.response.kategorie,
  receivedAt: Date.now()
});

// TODO: no component is subscribed to this action.
export const receiveKategorieError = ({ code, status, err }) => ({
  type: 'RECEIVE_KATEGORIE_ERROR',
  code,
  status,
  err,
  receivedAt: Date.now()
});
