'use strict';

const moment = require('moment');
const {
  CODE_OK,
  CODE_NONEXISTING,
  CODE_UNFULFILLED_REQUEST,
  STOPKY_ADD_MEZICAS,
  STOPKY_CHANGE_TIME,
  STOPKY_INSERT_MEZICAS,
  STOPKY_REMOVE_MEZICAS,
  STOPKY_RESET,
  STOPKY_START,
  STOPKY_STOP
} = require('../../../common/common');
const logger = require('../../logger');
const Stopky = require('../../model/Stopky/Stopky');
const broadcastStopky = require('./broadcastStopky');

const zeroDuration = moment.duration(0).toJSON();

const casSortMethod = (a, b) =>
  moment.duration(a.cas).asMilliseconds() - moment.duration(b.cas).asMilliseconds();
const sortByCas = mezicasy => mezicasy.sort(casSortMethod);

const addCasAndSort = (input, cas) => {
  const mezicasy = (input || []).slice();
  mezicasy.push({ cas });
  sortByCas(mezicasy);
  return mezicasy;
};

const modifications = {
  [STOPKY_ADD_MEZICAS]: ({ request: { now }, stopky: { base, mezicasy, running } }) => {
    if (!now) {
      return { code: CODE_UNFULFILLED_REQUEST, status: 'chybí parameter "now"' };
    }
    if (running) {
      const cas = moment.duration(new Date(now).getTime() - new Date(base).getTime()).toJSON();
      return {
        code: CODE_OK,
        changes: [{ name: 'mezicasy', value: addCasAndSort(mezicasy, cas) }]
      };
    }
    return { code: CODE_OK, changes: [] };
  },
  [STOPKY_RESET]: () => ({
    code: CODE_OK,
    changes: [
      { name: 'base', value: null },
      { name: 'delta', value: zeroDuration },
      { name: 'mezicasy', value: [] },
      { name: 'running', value: false }
    ]
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
          { name: 'delta', value: zeroDuration }
        ]
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
          { name: 'delta', value: delta }
        ]
      };
    }
    return { code: CODE_OK, changes: [] };
  }
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
      await Stopky.remove(); // precaution
    }
    stopky = new Stopky({ typ, running: false });
    logger.debug(`Vytvářím stopky pro typ ${typ}.`);
  }

  // Convert Mongoose sub-document into POJO via toObject().
  const { code, changes, status } = modifyFunction({ request, stopky: stopky.toObject() });
  if (code !== CODE_OK) {
    return { code, status };
  }

  changes.forEach(change => {
    stopky[change.name] = change.value;
  });
  await stopky.save();
  const broadcast = await broadcastStopky(stopky.toObject()); // TODO omit _id and __v
  return {
    broadcast,
    code: CODE_OK,
    status: 'uloženo v pořádku',
    response: { stopky: stopky.toObject() } // TODO omit _id and __v
  };
};

module.exports = modifyStopky;
