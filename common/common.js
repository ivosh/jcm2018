'use strict';

/* This file is present two times in the project repository:
   - common/common.js in CommonJS format (understood by Node JS)
   - ui/src/common.js in ES6 format (as required by create-react-app scripts)

   When Node.JS supports MJS modules formats natively, this could be just a single file.
 */

const PORT_DEV_CLIENT = 3000;
const PORT_DEV_SERVER = 4000;
const PLATBA_TYPY = ['hotově', 'převodem', 'složenkou'];

const BROADCAST_STOPKY = 'broadcastStopky';
const BROADCAST_UCASTNIK = 'broadcastUcastnik';
const DELETE_VYKON = 'deleteVykon';
const FIND_ALL_ROCNIKY = 'findAllRocniky';
const FIND_ALL_STOPKY = 'findAllStopky';
const FIND_ALL_UCASTNICI = 'findAllUcastnici';
const SAVE_PLATBY = 'savePlatby';
const SAVE_PRIHLASKA = 'savePrihlaska';
const SAVE_STOPKY = 'saveStopky';
const SAVE_UBYTOVANI = 'saveUbytovani';
const SAVE_UCAST = 'saveUcast';
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

const deleteVykon = ({ id, rok }, token) => ({
  action: DELETE_VYKON,
  request: { id, rok },
  token
});

const findAllRocniky = token => ({
  action: FIND_ALL_ROCNIKY,
  request: undefined,
  token
});

const findAllStopky = token => ({
  action: FIND_ALL_STOPKY,
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

const saveStopky = (stopky, token) => ({
  action: SAVE_STOPKY,
  request: stopky,
  token
});

const saveUbytovani = ({ id, rok, ubytovani }, token) => ({
  action: SAVE_UBYTOVANI,
  request: { id, rok, ubytovani },
  token
});

const saveUcast = ({ id, rok, udaje, prihlaska, vykon, platby, ubytovani, poznamka }, token) => ({
  action: SAVE_UCAST,
  request: { id, rok, udaje, prihlaska, vykon, platby, ubytovani, poznamka },
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
    return zkontrolujMladistvy(typKategorie, {
      datum: new Date(rocnik.datum),
      narozeni,
      mladistvyPotvrzen
    });
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
      datum: new Date(rocnik.datum),
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
  const spravnyVek = filtrujPodleVeku(spravnePohlavi, {
    rok,
    datum: new Date(rocnik.datum),
    narozeni
  });
  if (spravnyVek.length === 2 && spravnyVek[0].vek.presne) {
    spravnyVek.pop();
  }

  if (spravnyVek.length === 1) {
    return zkontrolujMladistvy(spravnyVek[0], {
      datum: new Date(rocnik.datum),
      narozeni,
      mladistvyPotvrzen
    });
  }

  if (spravnyVek.length === 0) {
    if (vek <= spravnePohlavi[0].vek.max) {
      return zkontrolujMladistvy(spravnePohlavi[0], {
        datum: new Date(rocnik.datum),
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

module.exports = {
  PORT_DEV_CLIENT,
  PORT_DEV_SERVER,
  PLATBA_TYPY,
  BROADCAST_STOPKY,
  BROADCAST_UCASTNIK,
  DELETE_VYKON,
  FIND_ALL_ROCNIKY,
  FIND_ALL_STOPKY,
  FIND_ALL_UCASTNICI,
  SAVE_PLATBY,
  SAVE_PRIHLASKA,
  SAVE_STOPKY,
  SAVE_UBYTOVANI,
  SAVE_UCAST,
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
  deleteVykon,
  findAllRocniky,
  findAllStopky,
  findAllUcastnici,
  findKategorie,
  savePlatby,
  savePrihlaska,
  saveStopky,
  saveUbytovani,
  saveUcast,
  saveUdaje,
  saveVykon,
  signIn,
  signOut,
  ubytovaniNeprespano,
  ubytovaniOdhlasit,
  ubytovaniPrespano,
  ubytovaniPrihlasit
};
