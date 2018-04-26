'use strict';

const Actions = require('../../../common/common');

const broadcastStopky = async stopky => ({
  broadcast: Actions.BROADCAST_STOPKY,
  data: { ...stopky }
});

module.exports = broadcastStopky;
