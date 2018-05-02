'use strict';

const Actions = require('../../../common/common');

const broadcastStopky = async stopky => {
  const { base, delta, running, typ } = stopky;
  const data = { base, delta, running, typ };

  return { broadcast: Actions.BROADCAST_STOPKY, data };
};

module.exports = broadcastStopky;
