'use strict';

/* This file is present two times in the project repository:
   - common/common.js in CommonJS format (understood by Node JS)
   - ui/src/common.js in ES6 format (as required by create-react-app scripts)

   When Node.JS supports MJS modules formats natively, this could be just a single file.
 */

const PORT_DEV_CLIENT = 3000;
const PORT_DEV_SERVER = 4000;
const PLATBA_TYPY = ['hotově', 'převodem', 'složenkou'];

const API_DELETE_VYKON = 'deleteVykon';
const API_FIND_ALL_ROCNIKY = 'findAllRocniky';
const API_FIND_ALL_STOPKY = 'findAllStopky';
const API_FIND_ALL_UCASTNICI = 'findAllUcastnici';
const API_SAVE_PLATBY = 'savePlatby';
const API_SAVE_PRIHLASKA = 'savePrihlaska';
const API_SAVE_STOPKY = 'saveStopky';
const API_SAVE_UBYTOVANI = 'saveUbytovani';
const API_SAVE_UCAST = 'saveUcast';
const API_SAVE_UDAJE = 'saveUdaje';
const API_SAVE_VYKON = 'saveVykon';
const API_SIGN_IN = 'signIn';
const API_SIGN_OUT = 'signOut';
const BROADCAST_STOPKY = 'broadcastStopky';
const BROADCAST_UCASTNIK = 'broadcastUcastnik';

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

const apiCall = ({ endpoint, request, token }) => ({ action: endpoint, request, token });

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
  API_DELETE_VYKON,
  API_FIND_ALL_ROCNIKY,
  API_FIND_ALL_STOPKY,
  API_FIND_ALL_UCASTNICI,
  API_SAVE_PLATBY,
  API_SAVE_PRIHLASKA,
  API_SAVE_STOPKY,
  API_SAVE_UBYTOVANI,
  API_SAVE_UCAST,
  API_SAVE_UDAJE,
  API_SAVE_VYKON,
  API_SIGN_IN,
  API_SIGN_OUT,
  BROADCAST_STOPKY,
  BROADCAST_UCASTNIK,
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
  apiCall,
  findKategorie,
  ubytovaniNeprespano,
  ubytovaniOdhlasit,
  ubytovaniPrespano,
  ubytovaniPrihlasit
};
