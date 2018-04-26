export const initialState = { byTypy: {}, typy: [], invalidated: false };

const stopkyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BROADCAST_STOPKY': {
      const { typ, ...ostatni } = action.data;
      const updated = { ...state, byTypy: { ...state.byTypy, [typ]: { typ, ...ostatni } } };
      return state.byTypy[typ] ? updated : { ...updated, typy: [...updated.allTypy, typ] };
    }
    case 'FETCH_STOPKY_SUCCESS':
      return { ...action.data, invalidated: false };
    case 'SIGN_OUT_SUCCESS':
      return { ...state, invalidated: true };
    case 'STOPKY_SAVE_SUCCESS':
      return state;
    case 'WEBSOCKET_DISCONNECTED':
      return { ...state, invalidated: true };
    default:
      return state;
  }
};

export default stopkyReducer;
