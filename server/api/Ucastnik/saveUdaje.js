'use strict';

const logger = require('heroku-logger');
const Actions = require('../../../common/common');
const createUcast = require('./createUcast');

const saveUdaje = async ({ request }) => {
  const { id, rok, udaje } = request;

  const { code, status, ucastnik } = await createUcast({ id, rok, udaje });
  logger.debug(
    `createUcast(id: ${id}, rok: ${rok}): code: ${code}, id: ${ucastnik ? ucastnik.id : '?'}`
  );

  if (code === Actions.CODE_OK) {
    const ucast = ucastnik.ucasti.find(oneUcast => oneUcast.rok === rok);
    ucast.udaje = udaje;
    await ucastnik.save();
    return { code: Actions.CODE_OK, status: 'uloženo v pořádku', response: { id: ucastnik.id } };
  }

  return { code, status };
};

module.exports = saveUdaje;
