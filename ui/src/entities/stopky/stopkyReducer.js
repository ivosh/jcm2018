import { SIGN_OUT } from '../../auth/SignOut/SignOutActions';
import { MODIFY_STOPKY } from '../../casomeric/Stopky/StopkyProTyp/StopkyProTypActions';

export const initialState = { byTypy: {}, typy: [], invalidated: false };

const updateState = ({ state, typ, stopky }) => {
  const updated = { ...state, byTypy: { ...state.byTypy, [typ]: { typ, ...stopky } } };
  return state.byTypy[typ] ? updated : { ...updated, typy: [...updated.typy, typ] };
};

const stopkyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BROADCAST_STOPKY': {
      const { typ, ...stopky } = action.data;
      return updateState({ state, typ, stopky });
    }
    case 'FETCH_STOPKY_SUCCESS': {
      const { byTypy, typy } = action.response;
      return { byTypy, typy, invalidated: false };
    }
    case `${SIGN_OUT}_SUCCESS`:
      return { ...state, invalidated: true };
    case `${MODIFY_STOPKY}_SUCCESS`: {
      const { typ } = action.request;
      const { stopky } = action.response;
      return updateState({ state, typ, stopky });
    }
    case 'WEBSOCKET_DISCONNECTED':
      return { ...state, invalidated: true };
    default:
      return state;
  }
};

export default stopkyReducer;
