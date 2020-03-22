import {
  API_MODIFY_STOPKY,
  STOPKY_ADD_MEZICAS,
  STOPKY_CHANGE_TIME,
  STOPKY_INSERT_MEZICAS,
  STOPKY_REMOVE_MEZICAS,
  STOPKY_RESET,
  STOPKY_START,
  STOPKY_STOP,
} from 'ui-common/common';
import { WS_API } from 'ui-common/store/wsAPI';

const normalize = ({
  request,
  response: {
    response: { stopky },
  },
}) => ({ request, response: { stopky } });

const createRequest = ({ cas, modifikace, now, state, step, typ }) => {
  if (now) {
    const nowWithOffset = new Date(new Date(now).getTime() + state.timesync.offset);
    return { cas, modifikace, now: nowWithOffset.toJSON(), step, typ };
  }
  return { cas, modifikace, step, typ };
};

export const MODIFY_STOPKY = 'MODIFY_STOPKY';
export const modifyStopky = ({ cas, modifikace, now, step, typ }) => ({
  [WS_API]: {
    type: MODIFY_STOPKY,
    endpoint: API_MODIFY_STOPKY,
    normalize,
    request: (state) => createRequest({ cas, modifikace, now, state, step, typ }),
    title: 'ukládání stopek',
  },
});

export const stopkyAddMezicas = ({ now = new Date(), typ }) =>
  modifyStopky({ modifikace: STOPKY_ADD_MEZICAS, now, typ });
export const stopkyInsertMezicas = ({ cas, typ }) =>
  modifyStopky({
    modifikace: STOPKY_INSERT_MEZICAS,
    cas: cas.toJSON ? cas.toJSON() : cas,
    typ,
  });
export const stopkyRemoveMezicas = ({ cas, typ }) =>
  modifyStopky({
    modifikace: STOPKY_REMOVE_MEZICAS,
    cas: cas.toJSON ? cas.toJSON() : cas,
    typ,
  });
export const stopkyReset = ({ typ }) => modifyStopky({ modifikace: STOPKY_RESET, typ });
export const stopkyStart = ({ now = new Date(), typ }) =>
  modifyStopky({ modifikace: STOPKY_START, now, typ });
export const stopkyStop = ({ now = new Date(), typ }) =>
  modifyStopky({ modifikace: STOPKY_STOP, now, typ });
// step is in milliseconds
export const stopkyChangeTime = ({ now = new Date(), step, typ }) =>
  modifyStopky({ modifikace: STOPKY_CHANGE_TIME, now, step, typ });
