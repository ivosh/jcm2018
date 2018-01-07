'use strict';

/* This file is present two times in the project repository:
   - common/common.js in CommonJS format (understood by Node JS)
   - ui/src/common.js in ES6 format (as required by create-react-app scripts)

   Convert from CommonJS format by the following incantation:
   cp common/common.js ui/src/common.js
   ./node_modules/jscodeshift/bin/jscodeshift.sh \
       -t node_modules/5to6-codemod/transforms/exports.js ui/src/common.js
   ./node_modules/jscodeshift/bin/jscodeshift.sh \
       -t node_modules/5to6-codemod/transforms/named-export-generation.js ui/src/common.js
   diff -u common/common.js ui/src/common.js
 */

const PORT = 4000;

const CREATE_UCAST = 'create_ucast';
const FIND_ALL_ROCNIKY = 'find_all_rocniky';
const FIND_ALL_UCASTNICI = 'find_all_ucastnici';
const FIND_UCAST_BY_UCASTNIK = 'find_ucast_by_ucastnik';
const SIGN_IN = 'sign_in';

const CODE_OK = 'ok';
const CODE_ALREADY_EXISTING = 'již existuje';
const CODE_DB_DISCONNECTED = 'nepřipojeno k databázi';
const CODE_MAX_LOGIN_ATTEMPTS = 'max login attempts reached';
const CODE_MLADISTVY_UCASTNIK = 'účastník potřebuje souhlas zákonného zástupce';
const CODE_NONCE_MISMATCH = 'nesouhlas jednorázového přihlašovacího kódu';
const CODE_NONEXISTING = 'neexistuje';
const CODE_PASSWORD_INCORRECT = 'password incorrect';
const CODE_UNFULFILLED_REQUEST = 'unfulfilled request';
const CODE_UNPARSEABLE_MESSAGE = 'unparseable message';
const CODE_UNRECOGNIZED_ACTION = 'unrecognized action';

const createUcast = ({ id, rok, udaje, prihlaska }) => ({
  action: CREATE_UCAST,
  request: { id, rok, udaje, prihlaska }
});

const findAllRocniky = token => ({
  action: FIND_ALL_ROCNIKY,
  request: undefined,
  token
});

const findAllUcastnici = token => ({
  action: FIND_ALL_UCASTNICI,
  request: undefined,
  token
});

const signIn = (username, password, nonce) => ({
  action: SIGN_IN,
  request: { username, password, nonce }
});

const zkontrolujMladistvy = (kategorie, { datum, narozeni, mladistvyPotvrzen }) => {
  if (!kategorie.vek) {
    return { kategorie, code: CODE_OK };
  }

  const PLNOLETOST = 18;
  const plnoletost = new Date(
    Date.UTC(narozeni.rok + PLNOLETOST, (narozeni.mesic || 1) - 1, narozeni.den || 0)
  );
  if (plnoletost > datum && !mladistvyPotvrzen) {
    return { kategorie: null, code: CODE_MLADISTVY_UCASTNIK };
  }

  return { kategorie, code: CODE_OK };
};

const filtrujPodleVeku = (kategorie, { rok, datum, narozeni }) =>
  kategorie.filter(item => {
    if (item.vek.presne) {
      const horniHranice = new Date(
        Date.UTC(narozeni.rok + item.vek.max + 1, (narozeni.mesic || 1) - 1, narozeni.den || 0)
      );
      if (horniHranice < datum) {
        return true;
      }
      return false;
    }

    const vek = rok - narozeni.rok;
    return item.vek.min <= vek && vek <= item.vek.max;
  });

const findKategorie = (rocniky, { rok, typ, pohlavi, narozeni, mladistvyPotvrzen }) => {
  const rocnik = rocniky[rok];
  if (!rocnik) {
    return { kategorie: null, code: CODE_NONEXISTING, status: `Ročník pro ${rok} neexistuje.` };
  }

  const typKategorie = rocnik.kategorie[typ];
  if (!typKategorie) {
    return {
      kategorie: null,
      code: CODE_NONEXISTING,
      status: `Kategorie '${typ}' v roce ${rok} neexistuje.`
    };
  }

  if (!typKategorie['muž'] && !typKategorie['žena']) {
    // jediná kategorie
    return zkontrolujMladistvy(typKategorie, { datum: rocnik.datum, narozeni, mladistvyPotvrzen });
  }

  const spravnePohlavi = typKategorie[pohlavi];
  if (!spravnePohlavi) {
    return {
      kategorie: null,
      code: CODE_NONEXISTING,
      status: `Kategorie '${typ}' v roce ${rok} neexistuje pro pohlaví '${pohlavi}'.`
    };
  }

  if (spravnePohlavi.length === 1) {
    return zkontrolujMladistvy(spravnePohlavi[0], {
      datum: rocnik.datum,
      narozeni,
      mladistvyPotvrzen
    });
  }

  const vek = rok - narozeni.rok;
  const spravnyVek = filtrujPodleVeku(spravnePohlavi, { rok, datum: rocnik.datum, narozeni });
  if (spravnyVek.length === 2 && spravnyVek[0].vek.presne) {
    spravnyVek.pop();
  }

  if (spravnyVek.length === 1) {
    return zkontrolujMladistvy(spravnyVek[0], {
      datum: rocnik.datum,
      narozeni,
      mladistvyPotvrzen
    });
  }

  if (spravnyVek.length === 0) {
    if (vek <= spravnePohlavi[0].vek.max) {
      return zkontrolujMladistvy(spravnePohlavi[0], {
        datum: rocnik.datum,
        narozeni,
        mladistvyPotvrzen
      });
    }
    return { kategorie: spravnePohlavi[spravnePohlavi.length - 1], code: CODE_OK };
  }

  return {
    kategorie: null,
    code: CODE_NONEXISTING,
    status: `Pro '${pohlavi}' - '${typ}' v roce ${rok} a věk ${vek} let jsem našel více kategorií.`
  };
};

module.exports = {
  PORT,
  CREATE_UCAST,
  FIND_ALL_ROCNIKY,
  FIND_ALL_UCASTNICI,
  FIND_UCAST_BY_UCASTNIK,
  SIGN_IN,
  CODE_OK,
  CODE_ALREADY_EXISTING,
  CODE_DB_DISCONNECTED,
  CODE_MAX_LOGIN_ATTEMPTS,
  CODE_MLADISTVY_UCASTNIK,
  CODE_NONCE_MISMATCH,
  CODE_NONEXISTING,
  CODE_PASSWORD_INCORRECT,
  CODE_UNFULFILLED_REQUEST,
  CODE_UNPARSEABLE_MESSAGE,
  CODE_UNRECOGNIZED_ACTION,
  createUcast,
  findAllRocniky,
  findAllUcastnici,
  findKategorie,
  signIn
};
