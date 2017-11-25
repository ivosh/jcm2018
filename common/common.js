'use strict';

const CREATE_UCAST = 'create_ucast';
const FIND_ALL_ROCNIKY = 'find_all_rocniky';
const FIND_ALL_UCASTNICI = 'find_all_ucastnici';
const FIND_UCAST_BY_UCASTNIK = 'find_ucast_by_ucastnik';

const CODE_OK = 'ok';
const CODE_ALREADY_EXISTING = 'již existuje';
const CODE_DB_DISCONNECTED = 'nepřipojeno k databázi';
const CODE_JDE_DO_STARSI_KATEGORIE = 'jde do starší kategorie';
const CODE_MLADISTVY_UCASTNIK = 'účastník potřebuje souhlas zákonného zástupce';
const CODE_NONEXISTING = 'neexistuje';
const CODE_UNFULFILLED_REQUEST = 'unfulfilled request';
const CODE_UNPARSEABLE_MESSAGE = 'unparseable message';
const CODE_UNRECOGNIZED_ACTION = 'unrecognized action';

const createUcast = ({ id, rok, udaje, prihlaska }) => ({
  action: CREATE_UCAST,
  request: { id, rok, udaje, prihlaska }
});

const findAllRocniky = () => ({
  action: FIND_ALL_ROCNIKY,
  request: undefined
});

const findAllUcastnici = () => ({
  action: FIND_ALL_UCASTNICI,
  request: undefined
});

const zkontrolujVek = (kategorie, { datum, narozeni, mladistvyPotvrzen }) => {
  if (!kategorie.vek) {
    return { kategorie, code: CODE_OK };
  }

  if (kategorie.vek.presne) {
    const horniHranice = new Date(
      narozeni.rok + kategorie.vek.max,
      (narozeni.mesic || 1) - 1,
      narozeni.den || 0
    );
    if (horniHranice >= datum) {
      return { kategorie: null, code: CODE_JDE_DO_STARSI_KATEGORIE };
    }
  }

  const PLNOLETOST = 18;
  const plnoletost = new Date(
    narozeni.rok + PLNOLETOST,
    (narozeni.mesic || 1) - 1,
    narozeni.den || 0
  );
  if (plnoletost > datum && !mladistvyPotvrzen) {
    return { kategorie: null, code: CODE_MLADISTVY_UCASTNIK };
  }

  return { kategorie, code: CODE_OK };
};

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
    return zkontrolujVek(typKategorie, { datum: rocnik.datum, narozeni, mladistvyPotvrzen });
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
    return zkontrolujVek(spravnePohlavi[0], { datum: rocnik.datum, narozeni, mladistvyPotvrzen });
  }

  let vek = rok - narozeni.rok;
  const kategorieList = spravnePohlavi.filter(item => item.vek.min <= vek && vek <= item.vek.max);
  if (kategorieList.length === 1) {
    const { kategorie, code } = zkontrolujVek(kategorieList[0], {
      datum: rocnik.datum,
      narozeni,
      mladistvyPotvrzen
    });
    if (code === CODE_JDE_DO_STARSI_KATEGORIE) {
      vek += 1;
      const starsiKategorie = spravnePohlavi.filter(
        item => item.vek.min <= vek && vek <= item.vek.max
      );
      return { kategorie: starsiKategorie[0], code: CODE_OK };
    }
    return { kategorie, code };
  }

  if (kategorieList.length === 0) {
    if (vek < spravnePohlavi[0].vek.min) {
      return zkontrolujVek(spravnePohlavi[0], { datum: rocnik.datum, narozeni, mladistvyPotvrzen });
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
  CREATE_UCAST,
  FIND_ALL_ROCNIKY,
  FIND_ALL_UCASTNICI,
  FIND_UCAST_BY_UCASTNIK,
  CODE_OK,
  CODE_ALREADY_EXISTING,
  CODE_DB_DISCONNECTED,
  CODE_MLADISTVY_UCASTNIK,
  CODE_NONEXISTING,
  CODE_UNFULFILLED_REQUEST,
  CODE_UNPARSEABLE_MESSAGE,
  CODE_UNRECOGNIZED_ACTION,
  createUcast,
  findAllRocniky,
  findAllUcastnici,
  findKategorie
};
