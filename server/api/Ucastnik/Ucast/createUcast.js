'use strict';

const { CODE_OK } = require('../../../../common/common');
const logger = require('../../../logger');
const Ucastnik = require('../../../model/Ucastnik/Ucastnik');
const findUcast = require('./findUcast');

/* Creates účast and účastník if necessary. Returns {code, ucast, ucastnik}. */
const createUcast = async ({ id, rok }) => {
  let ucast = null;
  let ucastnik = null;

  if (!id) {
    ucastnik = new Ucastnik();
    logger.debug('Účastník created.');
  } else {
    const found = await findUcast({ id, rok });
    ({ ucast, ucastnik } = found);
    const { code, status } = found;
    if (ucast) {
      return { code, status, ucast, ucastnik };
    }
    if (!ucastnik) {
      return { code, status };
    }
  }

  logger.debug(`Vytvářím novou účast pro rok ${rok} účastníka ${ucastnik.id}.`);
  ucastnik.ucasti.push({ rok });
  ucast = ucastnik.ucasti.find(oneUcast => oneUcast.rok === rok);
  return { code: CODE_OK, status: `Vytvořena účast pro rok ${rok}.`, ucast, ucastnik };
};

module.exports = createUcast;
