'use strict';

const updatePoznamky = ({ ucast, poznamky }) => {
  ucast.poznamky = poznamky; // eslint-disable-line no-param-reassign
};

module.exports = updatePoznamky;
