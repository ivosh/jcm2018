'use strict';

const Actions = require('../../../../common/common');

// Relies solely on mongoose schema validation.
const validatePoznamky = async () => ({ code: Actions.CODE_OK });

module.exports = validatePoznamky;
