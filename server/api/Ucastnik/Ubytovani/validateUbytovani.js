'use strict';

const Actions = require('../../../../common/common');

const validateUbytovani = async ({ rok, ubytovani, rocniky }) => {
  if (!ubytovani) {
    return { code: Actions.CODE_OK };
  }

  const rocnik = rocniky[rok];

  if (!rocnik) {
    return {
      code: Actions.CODE_NONEXISTING,
      status: `Ročník JCM pro rok ${rok} není vypsán.`,
    };
  }

  if (ubytovani.pátek && !rocnik.ubytovani.pátek) {
    return {
      code: Actions.CODE_NONEXISTING,
      status: 'Nelze se přihlásit na ubytování v pátek. Není vypsáno.',
    };
  }
  if (ubytovani.sobota && !rocnik.ubytovani.sobota) {
    return {
      code: Actions.CODE_NONEXISTING,
      status: 'Nelze se přihlásit na ubytování v sobotu. Není vypsáno.',
    };
  }

  return { code: Actions.CODE_OK };
};

module.exports = validateUbytovani;
