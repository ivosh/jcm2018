'use strict';

const updateUdaje = ({ ucast, udaje }) => {
  if (!udaje.stat) {
    /* If overwriting an existing údaje, we need to supply the defaults. */
    udaje.stat = 'Česká republika'; // eslint-disable-line no-param-reassign
  }
  ucast.udaje = udaje; // eslint-disable-line no-param-reassign
};

module.exports = updateUdaje;
