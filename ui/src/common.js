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
const PLATBA_TYPY = ['hotově', 'převodem', 'složenkou'];

const BROADCAST_UCASTNIK = 'broadcastUcastnik';
const FIND_ALL_ROCNIKY = 'findAllRocniky';
const FIND_ALL_UCASTNICI = 'findAllUcastnici';
const SAVE_PLATBY = 'savePlatby';
const SAVE_PRIHLASKA = 'savePrihlaska';
const SAVE_UBYTOVANI = 'saveUbytovani';
const SAVE_UDAJE = 'saveUdaje';
const SAVE_VYKON = 'saveVykon';
const SIGN_IN = 'signIn';
const SIGN_OUT = 'signOut';

const CODE_OK = 'ok';
const CODE_ALREADY_EXISTING = 'již existuje';
const CODE_DB_DISCONNECTED = 'nepřipojeno k databázi';
const CODE_DUPLICIT_START_CISLO = 'duplicitní startovní číslo';
const CODE_KATEGORIE_INVALID = 'chybná kategorie';
const CODE_MAX_LOGIN_ATTEMPTS = 'max login attempts reached';
const CODE_MLADISTVY_UCASTNIK = 'účastník potřebuje souhlas zákonného zástupce';
const CODE_NONCE_MISMATCH = 'nesouhlas jednorázového přihlašovacího kódu';
const CODE_NONEXISTING = 'neexistuje';
const CODE_PASSWORD_INCORRECT = 'password incorrect';
const CODE_TOKEN_INVALID = 'authentication token invalid';
const CODE_UNFULFILLED_REQUEST = 'unfulfilled request';
const CODE_UNPARSEABLE_MESSAGE = 'unparseable message';
const CODE_UNRECOGNIZED_ACTION = 'unrecognized action';

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

const savePlatby = ({ id, rok, platby }, token) => ({
  action: SAVE_PLATBY,
  request: { id, rok, platby },
  token
});

const savePrihlaska = ({ id, rok, prihlaska }, token) => ({
  action: SAVE_PRIHLASKA,
  request: { id, rok, prihlaska },
  token
});

const saveUbytovani = ({ id, rok, ubytovani }, token) => ({
  action: SAVE_UBYTOVANI,
  request: { id, rok, ubytovani },
  token
});

const saveUdaje = ({ id, rok, udaje }, token) => ({
  action: SAVE_UDAJE,
  request: { id, rok, udaje },
  token
});

const saveVykon = ({ id, rok, vykon }, token) => ({
  action: SAVE_VYKON,
  request: { id, rok, vykon },
  token
});

const signIn = (username, password, nonce) => ({
  action: SIGN_IN,
  request: { username, password, nonce }
});

const signOut = token => ({
  action: SIGN_OUT,
  token
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

  if (!narozeni.rok) {
    return {
      kategorie: null,
      code: CODE_NONEXISTING,
      status: 'Nevyplněné datum narození (je potřeba alespoň rok).'
    };
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

const ubytovaniPrihlasit = ({ den, ubytovani = {} }) => ({
  ...ubytovani,
  [den]: { ...ubytovani[den], prihlaseno: true }
});
const ubytovaniOdhlasit = ({ den, ubytovani = {} }) => {
  const { [den]: remove, ...rest } = ubytovani;
  return rest;
};
const ubytovaniPrespano = ({ den, ubytovani = {} }) => ({
  ...ubytovani,
  [den]: { ...ubytovani[den], prespano: true }
});
const ubytovaniNeprespano = ({ den, ubytovani = {} }) => ({
  ...ubytovani,
  [den]: { ...ubytovani[den], prespano: false }
});

const exported = {
  PORT,
  PLATBA_TYPY,
  BROADCAST_UCASTNIK,
  FIND_ALL_ROCNIKY,
  FIND_ALL_UCASTNICI,
  SAVE_PLATBY,
  SAVE_PRIHLASKA,
  SAVE_UBYTOVANI,
  SAVE_UDAJE,
  SAVE_VYKON,
  SIGN_IN,
  SIGN_OUT,
  CODE_OK,
  CODE_ALREADY_EXISTING,
  CODE_DB_DISCONNECTED,
  CODE_DUPLICIT_START_CISLO,
  CODE_KATEGORIE_INVALID,
  CODE_MAX_LOGIN_ATTEMPTS,
  CODE_MLADISTVY_UCASTNIK,
  CODE_NONCE_MISMATCH,
  CODE_NONEXISTING,
  CODE_PASSWORD_INCORRECT,
  CODE_TOKEN_INVALID,
  CODE_UNFULFILLED_REQUEST,
  CODE_UNPARSEABLE_MESSAGE,
  CODE_UNRECOGNIZED_ACTION,
  findAllRocniky,
  findAllUcastnici,
  findKategorie,
  savePlatby,
  savePrihlaska,
  saveUbytovani,
  saveUdaje,
  saveVykon,
  signIn,
  signOut,
  ubytovaniNeprespano,
  ubytovaniOdhlasit,
  ubytovaniPrespano,
  ubytovaniPrihlasit
};

export default exported;
export {
  PORT,
  PLATBA_TYPY,
  BROADCAST_UCASTNIK,
  FIND_ALL_ROCNIKY,
  FIND_ALL_UCASTNICI,
  SAVE_PLATBY,
  SAVE_PRIHLASKA,
  SAVE_UBYTOVANI,
  SAVE_UDAJE,
  SAVE_VYKON,
  SIGN_IN,
  SIGN_OUT,
  CODE_OK,
  CODE_ALREADY_EXISTING,
  CODE_DB_DISCONNECTED,
  CODE_DUPLICIT_START_CISLO,
  CODE_KATEGORIE_INVALID,
  CODE_MAX_LOGIN_ATTEMPTS,
  CODE_MLADISTVY_UCASTNIK,
  CODE_NONCE_MISMATCH,
  CODE_NONEXISTING,
  CODE_PASSWORD_INCORRECT,
  CODE_TOKEN_INVALID,
  CODE_UNFULFILLED_REQUEST,
  CODE_UNPARSEABLE_MESSAGE,
  CODE_UNRECOGNIZED_ACTION,
  findAllRocniky,
  findAllUcastnici,
  findKategorie,
  savePlatby,
  savePrihlaska,
  saveUbytovani,
  saveUdaje,
  saveVykon,
  signIn,
  signOut,
  ubytovaniNeprespano,
  ubytovaniOdhlasit,
  ubytovaniPrespano,
  ubytovaniPrihlasit
};
