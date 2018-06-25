'use strict';

const Actions = require('../../../../common/common');

// const { kategorie, rocniky } = await findAllRocniky();
const updatePrihlaska = async ({ rok, prihlaska, ucast, kategorie, rocniky }) => {
  const { typ } = kategorie[prihlaska.kategorie];

  delete prihlaska.typ; // eslint-disable-line no-param-reassign
  if (!rocniky[rok].kategorie[typ].startCisla) {
    delete prihlaska.startCislo; // eslint-disable-line no-param-reassign
  }

  ucast.prihlaska = prihlaska; // eslint-disable-line no-param-reassign
  return { code: Actions.CODE_OK };
};

module.exports = updatePrihlaska;
