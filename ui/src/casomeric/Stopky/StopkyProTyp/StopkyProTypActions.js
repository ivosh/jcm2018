import { API_SAVE_STOPKY } from '../../../common';
import { WS_API } from '../../../store/wsAPI';
import stopkyProTypReducer, { getStopkyByTyp } from './stopkyProTypReducer';

export const stopkyAddMezicas = ({ now = new Date() } = {}) => ({
  type: 'STOPKY_ADD_MEZICAS',
  now
});
export const stopkyInsertMezicas = ({ cas }) => ({
  type: 'STOPKY_INSERT_MEZICAS',
  cas: cas.toJSON ? cas.toJSON() : cas
});
export const stopkyRemoveMezicas = ({ cas }) => ({
  type: 'STOPKY_REMOVE_MEZICAS',
  cas: cas.toJSON ? cas.toJSON() : cas
});
export const stopkyReset = () => ({ type: 'STOPKY_RESET' });
export const stopkyStart = ({ now = new Date() } = {}) => ({ type: 'STOPKY_START', now });
export const stopkyStop = ({ now = new Date() } = {}) => ({ type: 'STOPKY_STOP', now });
// step is in milliseconds
export const stopkyChange = ({ step }) => ({ type: 'STOPKY_CHANGE', step });

const createRequest = ({ action, state, typ }) => {
  const stopky = stopkyProTypReducer(getStopkyByTyp({ state, typ }), action);
  return { ...stopky, typ };
};

export const SAVE_STOPKY = 'SAVE_STOPKY';
export const saveStopky = ({ action, typ }) => ({
  [WS_API]: {
    type: SAVE_STOPKY,
    endpoint: API_SAVE_STOPKY,
    request: state => createRequest({ action, state, typ }),
    title: 'ukládání stopek'
  }
});
