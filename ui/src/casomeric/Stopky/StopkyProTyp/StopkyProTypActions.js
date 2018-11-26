import {
  API_MODIFY_STOPKY,
  STOPKY_ADD_MEZICAS,
  STOPKY_CHANGE_TIME,
  STOPKY_INSERT_MEZICAS,
  STOPKY_REMOVE_MEZICAS,
  STOPKY_RESET,
  STOPKY_START,
  STOPKY_STOP
} from '../../../common';
import { WS_API } from '../../../store/wsAPI';

const normalize = ({
  request,
  response: {
    response: { stopky }
  }
}) => ({ request, response: { stopky } });

export const MODIFY_STOPKY = 'MODIFY_STOPKY';
export const modifyStopky = ({ cas, modifikace, now, step, typ }) => ({
  [WS_API]: {
    type: MODIFY_STOPKY,
    endpoint: API_MODIFY_STOPKY,
    normalize,
    request: { cas, modifikace, now, step, typ },
    title: 'ukládání stopek'
  }
});

export const stopkyAddMezicas = ({ now = new Date(), typ }) =>
  modifyStopky({
    modifikace: STOPKY_ADD_MEZICAS,
    now: now.toJSON ? now.toJSON() : now,
    typ
  });
export const stopkyInsertMezicas = ({ cas, typ }) =>
  modifyStopky({
    modifikace: STOPKY_INSERT_MEZICAS,
    cas: cas.toJSON ? cas.toJSON() : cas,
    typ
  });
export const stopkyRemoveMezicas = ({ cas, typ }) =>
  modifyStopky({
    modifikace: STOPKY_REMOVE_MEZICAS,
    cas: cas.toJSON ? cas.toJSON() : cas,
    typ
  });
export const stopkyReset = ({ typ }) => modifyStopky({ modifikace: STOPKY_RESET, typ });
export const stopkyStart = ({ now = new Date(), typ }) =>
  modifyStopky({ modifikace: STOPKY_START, now: now.toJSON ? now.toJSON() : now, typ });
export const stopkyStop = ({ now = new Date(), typ }) =>
  modifyStopky({ modifikace: STOPKY_STOP, now: now.toJSON ? now.toJSON() : now, typ });
// step is in milliseconds
export const stopkyChangeTime = ({ step, typ }) =>
  modifyStopky({ modifikace: STOPKY_CHANGE_TIME, step, typ });
