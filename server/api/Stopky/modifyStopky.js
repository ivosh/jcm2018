'use strict';

const moment = require('moment');
const {
  CODE_OK,
  CODE_NONEXISTING,
  CODE_NOT_ALLOWED,
  CODE_UNFULFILLED_REQUEST,
  STOPKY_ADD_MEZICAS,
  STOPKY_CHANGE_TIME,
  STOPKY_INSERT_MEZICAS,
  STOPKY_REMOVE_MEZICAS,
  STOPKY_RESET,
  STOPKY_START,
  STOPKY_STOP,
  casSortMethod,
} = require('../../../common/common');
const logger = require('../../logger');
const Stopky = require('../../model/Stopky/Stopky');
const broadcastStopky = require('./broadcastStopky');

const zeroDuration = moment.duration(0).toJSON();
const sortByCas = (mezicasy) => mezicasy.sort(casSortMethod);

const addCasAndSort = (input, cas) => {
  const mezicasy = (input || []).slice();
  mezicasy.push({ cas });
  sortByCas(mezicasy);
  return mezicasy;
};

const toPOJO = (stopky) => {
  const { _id, __v, ...withoutIdAndVersion } = stopky.toObject();
  return withoutIdAndVersion;
};

// "now" and "base" are in JSON ISO8601 format, "cas" is a JSON duration, "step" is bare [ms]
const modifications = {
  [STOPKY_ADD_MEZICAS]: ({ request: { now }, stopky: { base, mezicasy, running } }) => {
    if (!now) {
      return { code: CODE_UNFULFILLED_REQUEST, status: 'chybí parameter "now"' };
    }
    if (running) {
      const cas = moment.duration(new Date(now).getTime() - new Date(base).getTime()).toJSON();
      return {
        code: CODE_OK,
        changes: [{ name: 'mezicasy', value: addCasAndSort(mezicasy, cas) }],
      };
    }
    return { code: CODE_OK, changes: [] };
  },
  [STOPKY_INSERT_MEZICAS]: ({ request: { cas }, stopky: { mezicasy } }) => {
    if (!cas) {
      return { code: CODE_UNFULFILLED_REQUEST, status: 'chybí parameter "cas"' };
    }
    return { code: CODE_OK, changes: [{ name: 'mezicasy', value: addCasAndSort(mezicasy, cas) }] };
  },
  [STOPKY_REMOVE_MEZICAS]: ({ request: { cas }, stopky: { mezicasy } }) => ({
    code: CODE_OK,
    changes: [{ name: 'mezicasy', value: mezicasy.filter((mezicas) => mezicas.cas !== cas) }],
  }),
  [STOPKY_CHANGE_TIME]: ({ request: { now, step }, stopky: { base, delta, running } }) => {
    if (!now) {
      return { code: CODE_UNFULFILLED_REQUEST, status: 'chybí parameter "now"' };
    }
    if (!step) {
      return { code: CODE_UNFULFILLED_REQUEST, status: 'chybí parameter "step"' };
    }
    if (running) {
      const newBase = new Date(base).getTime() - step;
      if (newBase <= new Date(now).getTime()) {
        return {
          code: CODE_OK,
          changes: [{ name: 'base', value: new Date(newBase).toJSON() }],
        };
      }
      return { code: CODE_NOT_ALLOWED, status: 'stopky by se dostaly do mínusu' };
    }
    if (step >= 0) {
      const newDelta = moment.duration(delta).add(step);
      return { code: CODE_OK, changes: [{ name: 'delta', value: newDelta.toJSON() }] };
    }

    const newDelta = moment.duration(delta).subtract(-step);
    if (newDelta >= 0) {
      return { code: CODE_OK, changes: [{ name: 'delta', value: newDelta.toJSON() }] };
    }
    return { code: CODE_OK, changes: [] };
  },
  [STOPKY_RESET]: () => ({
    code: CODE_OK,
    changes: [
      { name: 'base', value: null },
      { name: 'delta', value: zeroDuration },
      { name: 'mezicasy', value: [] },
      { name: 'running', value: false },
    ],
  }),
  [STOPKY_START]: ({ request: { now }, stopky: { delta, running } }) => {
    if (!now) {
      return { code: CODE_UNFULFILLED_REQUEST, status: 'chybí parameter "now"' };
    }
    if (!running) {
      const base = new Date(new Date(now).getTime() - moment.duration(delta).valueOf()).toJSON();
      return {
        code: CODE_OK,
        changes: [
          { name: 'running', value: true },
          { name: 'base', value: base },
          { name: 'delta', value: zeroDuration },
        ],
      };
    }
    return { code: CODE_OK, changes: [] };
  },
  [STOPKY_STOP]: ({ request: { now }, stopky: { base, running } }) => {
    if (!now) {
      return { code: CODE_UNFULFILLED_REQUEST, status: 'chybí parameter "now"' };
    }
    if (running) {
      const delta = moment.duration(new Date(now).getTime() - new Date(base).getTime()).toJSON();
      return {
        code: CODE_OK,
        changes: [
          { name: 'running', value: false },
          { name: 'base', value: null },
          { name: 'delta', value: delta },
        ],
      };
    }
    return { code: CODE_OK, changes: [] };
  },
};

const modifyStopky = async ({ request }) => {
  const { modifikace, typ } = request;

  const modifyFunction = modifications[modifikace];
  if (!modifyFunction) {
    return { code: CODE_NONEXISTING, status: `Neexistující modifikace stopek '${modifikace}'.` };
  }

  let stopky = null;
  const nalezene = await Stopky.find({ typ });
  if (nalezene.length === 1) {
    [stopky] = nalezene;
    logger.debug(`Nalezeny stopky pro typ ${typ}.`);
  } else {
    if (nalezene.length > 1) {
      await Stopky.deleteMany({ typ }); // precaution
    }
    stopky = new Stopky({ typ, running: false });
    logger.debug(`Vytvářím stopky pro typ ${typ}.`);
  }

  // Convert Mongoose sub-document into POJO via toObject().
  const { code, changes, status } = modifyFunction({ request, stopky: stopky.toObject() });
  if (code !== CODE_OK) {
    return { code, status };
  }

  changes.forEach((change) => {
    stopky[change.name] = change.value;
  });
  await stopky.save();
  const broadcast = await broadcastStopky(toPOJO(stopky));
  return {
    broadcast,
    code: CODE_OK,
    status: 'uloženo v pořádku',
    response: { stopky: toPOJO(stopky) },
  };
};

module.exports = modifyStopky;
