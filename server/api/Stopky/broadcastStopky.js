'use strict';

const Actions = require('../../../common/common');

const broadcastStopky = async stopky => {
  const json = stopky.toJSON ? stopky.toJSON() : stopky;
  const { _id, __v, ...data } = json;

  return { broadcast: Actions.BROADCAST_STOPKY, data };
};

module.exports = broadcastStopky;
