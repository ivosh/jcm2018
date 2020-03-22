'use strict';

const Actions = require('../../../common/common');
const Stopky = require('../../model/Stopky/Stopky');

const normalizeStopky = (stopky) => {
  const normalized = {};

  stopky.forEach((element) => {
    const { typ, __v, _id, ...stopkyBezTypu } = element;
    const jedny = { typ, ...stopkyBezTypu };

    normalized[typ] = jedny;
  });

  return normalized;
};

const findAllStopky = async () => {
  const stopky = await Stopky.find().lean();
  return { code: Actions.CODE_OK, status: undefined, response: { ...normalizeStopky(stopky) } };
};

module.exports = findAllStopky;
