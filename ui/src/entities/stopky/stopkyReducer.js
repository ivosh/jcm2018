export const initialState = { byTypy: {}, typy: [], invalidated: false };

const updateState = ({ state, typ, stopky }) => {
  const updated = { ...state, byTypy: { ...state.byTypy, [typ]: { typ, ...stopky } } };
  return state.byTypy[typ] ? updated : { ...updated, typy: [...updated.allTypy, typ] };
};

const stopkyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BROADCAST_STOPKY': {
      const { typ, ...stopky } = action.data;
      return updateState({ state, typ, stopky });
    }
    case 'FETCH_STOPKY_SUCCESS':
      return { ...action.data, invalidated: false };
    case 'SIGN_OUT_SUCCESS':
      return { ...state, invalidated: true };
    case 'SAVE_STOPKY_SUCCESS': {
      const { typ, ...stopky } = action.stopky;
      return updateState({ state, typ, stopky });
    }
    case 'WEBSOCKET_DISCONNECTED':
      return { ...state, invalidated: true };
    default:
      return state;
  }
};

export default stopkyReducer;
