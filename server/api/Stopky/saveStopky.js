'use strict';

const moment = require('moment');
const Actions = require('../../../common/common');
const logger = require('../../logger');
const Stopky = require('../../model/Stopky/Stopky');
const broadcastStopky = require('./broadcastStopky');

const casSortMethod = (a, b) =>
  moment.duration(a.cas).asMilliseconds() - moment.duration(b.cas).asMilliseconds();

const saveStopky = async ({ request }) => {
  const { typ, base, delta, mezicasy, running } = request;

  let stopky = null;
  const nalezene = await Stopky.find({ typ });
  if (nalezene.length === 1) {
    [stopky] = nalezene;
    logger.debug(`Nalezeny stopky pro typ ${typ}.`);
  } else {
    if (nalezene.length > 1) {
      await Stopky.remove();
    }
    stopky = new Stopky({ typ });
    logger.debug(`Vytvářím stopky pro typ ${typ}.`);
  }

  if (mezicasy) {
    mezicasy.sort(casSortMethod);
  }

  stopky.base = base;
  stopky.delta = delta;
  stopky.mezicasy = mezicasy;
  stopky.running = running;
  await stopky.save();

  const broadcast = await broadcastStopky(stopky);
  return { broadcast, code: Actions.CODE_OK, status: 'uloženo v pořádku' };
};

module.exports = saveStopky;
