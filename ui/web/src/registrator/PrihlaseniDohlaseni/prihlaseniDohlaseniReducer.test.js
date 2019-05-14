import deepFreeze from 'deep-freeze';
import { ActionPrefixes, ReduxNames } from '../../constants';
import ucastniciTestData, {
  AKTUALNI_DATUM_KONANI
} from '../../entities/ucastnici/ucastniciTestData';
import { SortDirTypes } from '../../sort';
import {
  createKategorieFilterChange,
  createTextFilterChange
} from '../Filterable/FilterableActions';
import { createSortDirChange } from '../UcastniciTable/UcastniciTableActions';
import {
  createDohlaseniFilterChange,
  createHidePoznamky,
  createPrihlaseniFilterChange,
  createShowPoznamky
} from './PrihlaseniDohlaseniActions';
import {
  createPrihlaseniDohlaseniReducer,
  getPrihlaseniDohlaseniSorted
} from './prihlaseniDohlaseniReducer';

const actionPrefix = ActionPrefixes.PRIHLASENI;
const reduxName = ReduxNames.prihlaseni;
const dohlaseniFilterChange = createDohlaseniFilterChange(actionPrefix);
const hidePoznamky = createHidePoznamky(actionPrefix);
const kategorieFilterChange = createKategorieFilterChange(actionPrefix);
const prihlaseniFilterChange = createPrihlaseniFilterChange(actionPrefix);
const prihlaseniDohlaseniReducer = createPrihlaseniDohlaseniReducer(actionPrefix);
const showPoznamky = createShowPoznamky(actionPrefix);
const sortDirChange = createSortDirChange(actionPrefix);
const textFilterChange = createTextFilterChange(actionPrefix);

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = prihlaseniDohlaseniReducer(stateBefore, {});
  expect(stateAfter.dohlaseniFilter).toBe(false);
  expect(stateAfter.prihlaseniFilter).toBe(true);
  expect(stateAfter.kategorieFilter).toEqual('');
  expect(stateAfter.textFilter).toEqual('');
  expect(stateAfter.sortColumn).toBe(undefined);
  expect(stateAfter.sortDir).toEqual(SortDirTypes.NONE);
});

it('přepínání dohlaseniFilter - tam', () => {
  const stateBefore = { dohlaseniFilter: false };
  const stateAfter = { dohlaseniFilter: true };
  deepFreeze(stateBefore);

  expect(prihlaseniDohlaseniReducer(stateBefore, dohlaseniFilterChange())).toEqual(stateAfter);
});

it('přepínání dohlaseniFilter - a zase zpět', () => {
  const stateBefore = { dohlaseniFilter: true };
  const stateAfter = { dohlaseniFilter: false };
  deepFreeze(stateBefore);

  expect(prihlaseniDohlaseniReducer(stateBefore, dohlaseniFilterChange())).toEqual(stateAfter);
});

it('přepínání prihlaseniFilter - tam', () => {
  const stateBefore = { prihlaseniFilter: true };
  const stateAfter = { prihlaseniFilter: false };
  deepFreeze(stateBefore);

  expect(prihlaseniDohlaseniReducer(stateBefore, prihlaseniFilterChange())).toEqual(stateAfter);
});

it('přepínání prihlaseniFilter - a zase zpět', () => {
  const stateBefore = { prihlaseniFilter: false };
  const stateAfter = { prihlaseniFilter: true };
  deepFreeze(stateBefore);

  expect(prihlaseniDohlaseniReducer(stateBefore, prihlaseniFilterChange())).toEqual(stateAfter);
});

it('hidePoznamky()', () => {
  const stateBefore = { showingPoznamkyFor: '===id1===' };
  const stateAfter = { showingPoznamkyFor: undefined };
  deepFreeze(stateBefore);

  expect(prihlaseniDohlaseniReducer(stateBefore, hidePoznamky())).toEqual(stateAfter);
});

it('přepínání showPoznamky', () => {
  const stateBefore = { showingPoznamkyFor: undefined };
  const stateAfter = { showingPoznamkyFor: '===id2===' };
  deepFreeze(stateBefore);

  expect(prihlaseniDohlaseniReducer(stateBefore, showPoznamky('===id2==='))).toEqual(stateAfter);
});

it('řadit dle příjmení vzestupně', () => {
  const stateBefore = {
    sortColumn: undefined,
    sortDir: SortDirTypes.NONE,
    kategorieFilter: '',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, sortColumn: 'prijmeni', sortDir: SortDirTypes.ASC };
  deepFreeze(stateBefore);

  expect(prihlaseniDohlaseniReducer(stateBefore, sortDirChange('prijmeni'))).toEqual(stateAfter);
});

it('řadit dle příjmení sestupně', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieFilter: '',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, sortColumn: 'prijmeni', sortDir: SortDirTypes.DESC };
  deepFreeze(stateBefore);

  expect(prihlaseniDohlaseniReducer(stateBefore, sortDirChange('prijmeni'))).toEqual(stateAfter);
});

it('řadit dle příjmení zase vzestupně', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.DESC,
    kategorieFilter: '',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, sortColumn: 'prijmeni', sortDir: SortDirTypes.ASC };
  deepFreeze(stateBefore);

  expect(prihlaseniDohlaseniReducer(stateBefore, sortDirChange('prijmeni'))).toEqual(stateAfter);
});

it('řadit dle jména vzestupně', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieFilter: '',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, sortColumn: 'jmeno', sortDir: SortDirTypes.ASC };
  deepFreeze(stateBefore);

  expect(prihlaseniDohlaseniReducer(stateBefore, sortDirChange('jmeno'))).toEqual(stateAfter);
});

it('zapnout filtrování podle kategorie výkonu', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieFilter: '',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, kategorieFilter: 'půlmaraton' };
  deepFreeze(stateBefore);

  expect(prihlaseniDohlaseniReducer(stateBefore, kategorieFilterChange('půlmaraton'))).toEqual(
    stateAfter
  );
});

it('vypnout filtrování podle kategorie výkonu', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieFilter: 'půlmaraton',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, kategorieFilter: '' };
  deepFreeze(stateBefore);

  expect(prihlaseniDohlaseniReducer(stateBefore, kategorieFilterChange('půlmaraton'))).toEqual(
    stateAfter
  );
});

it('přepnout filtrování podle kategorie výkonu', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieFilter: 'půlmaraton',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, kategorieFilter: 'pěší' };
  deepFreeze(stateBefore);

  expect(prihlaseniDohlaseniReducer(stateBefore, kategorieFilterChange('pěší'))).toEqual(
    stateAfter
  );
});

it('filtrovat na dvě písmena', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieFilter: '',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, textFilter: 'kl' };
  deepFreeze(stateBefore);

  expect(prihlaseniDohlaseniReducer(stateBefore, textFilterChange('Kl'))).toEqual(stateAfter);
});

it('getPrihlaseniSorted() by default - prihlášeni i dohlášeni', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      [reduxName]: {
        dohlaseniFilter: false,
        prihlaseniFilter: false,
        sortColumn: undefined,
        sortDir: undefined,
        kategorieFilter: '',
        textFilter: ''
      }
    }
  };
  const selected = [
    {
      id: '5a09b1fd371dec1e99b7e1c9',
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: { rok: 1956 },
      obec: 'Ostrava 2',
      email: '',
      datum: new Date(AKTUALNI_DATUM_KONANI),
      kategorie: {
        id: '5a587e1b051c181132cf83d7',
        pohlavi: 'muž',
        typ: 'půlmaraton',
        vek: { min: 60, max: 150 }
      },
      startCislo: 17,
      kod: '10728864',
      zaplaceno: 250,
      predepsano: 250,
      nejakaPoznamka: false
    },
    {
      id: '8344bc71dec1e99b7e1d01e',
      prijmeni: 'Kyselová',
      jmeno: 'Slavěna',
      narozeni: { den: 13, mesic: 8, rok: 2001 },
      obec: 'Aš',
      email: 'sks@por.cz',
      datum: new Date(AKTUALNI_DATUM_KONANI),
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 }
      },
      startCislo: 15,
      kod: '0234jsdj0jdaklsd',
      zaplaceno: 0,
      predepsano: 0,
      nejakaPoznamka: true
    },
    {
      id: '9ccbc71dedc1e99b7e1d671',
      prijmeni: 'Půlmaratonka',
      jmeno: 'Božena',
      narozeni: { den: 25, mesic: 7, rok: 2001 },
      obec: 'Velhartice',
      email: 'pul.ka@s.cz',
      datum: new Date('2019-05-12T00:00:00.000Z'),
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 }
      },
      startCislo: 8,
      kod: 'abc023skd204mvs345',
      zaplaceno: 0,
      predepsano: 200,
      nejakaPoznamka: false
    },
    {
      id: 'f5c88400190a4bed88c76736',
      prijmeni: 'Smalt',
      jmeno: 'Josef',
      narozeni: { den: 25, mesic: 7, rok: 2001 },
      obec: 'Králův Dvůr',
      email: '',
      datum: new Date('2019-05-17T00:00:00.000Z'),
      kategorie: {
        id: '5a587e1a051c181132cf83b8',
        typ: 'maraton',
        pohlavi: 'muž',
        vek: { min: 18, max: 39 }
      },
      startCislo: 15,
      kod: 'rcc023skd204mvs345',
      zaplaceno: 200,
      predepsano: 200,
      nejakaPoznamka: false
    },
    {
      id: '7a09b1fd371dec1e99b7e142',
      prijmeni: 'Zralá',
      jmeno: 'Hana',
      narozeni: { den: 25, mesic: 7, rok: 1999 },
      obec: 'Bučovice',
      email: 'zrala.kl@s.cz',
      datum: new Date('2019-05-12T00:00:00.000Z'),
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 }
      },
      startCislo: 10,
      kod: 'abc023skd204mvs345',
      zaplaceno: 180,
      predepsano: 200,
      nejakaPoznamka: true
    }
  ];
  deepFreeze(state);

  const {
    entities,
    registrator: { [reduxName]: props }
  } = state;
  expect(getPrihlaseniDohlaseniSorted({ ...entities, ...props })).toEqual(selected);
});

it('getPrihlaseniSorted() filtrováno na z', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      [reduxName]: {
        dohlaseniFilter: false,
        prihlaseniFilter: false,
        sortColumn: undefined,
        sortDir: undefined,
        kategorieFilter: '',
        textFilter: 'z'
      }
    }
  };
  const selected = [
    {
      id: '7a09b1fd371dec1e99b7e142',
      prijmeni: 'Zralá',
      jmeno: 'Hana',
      narozeni: { den: 25, mesic: 7, rok: 1999 },
      obec: 'Bučovice',
      email: 'zrala.kl@s.cz',
      datum: new Date('2019-05-12T00:00:00.000Z'),
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 }
      },
      startCislo: 10,
      kod: 'abc023skd204mvs345',
      zaplaceno: 180,
      predepsano: 200,
      nejakaPoznamka: true
    }
  ];
  deepFreeze(state);

  const {
    entities,
    registrator: { [reduxName]: props }
  } = state;
  expect(getPrihlaseniDohlaseniSorted({ ...entities, ...props })).toEqual(selected);
});

it('getPrihlaseniSorted() filtrováno na kategorii výkonu půlmaraton', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      [reduxName]: {
        dohlaseniFilter: false,
        prihlaseniFilter: false,
        sortColumn: undefined,
        sortDir: undefined,
        kategorieFilter: 'půlmaraton',
        textFilter: ''
      }
    }
  };
  const selected = [
    {
      id: '5a09b1fd371dec1e99b7e1c9',
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: { rok: 1956 },
      obec: 'Ostrava 2',
      email: '',
      datum: new Date(AKTUALNI_DATUM_KONANI),
      kategorie: {
        id: '5a587e1b051c181132cf83d7',
        pohlavi: 'muž',
        typ: 'půlmaraton',
        vek: { min: 60, max: 150 }
      },
      startCislo: 17,
      kod: '10728864',
      zaplaceno: 250,
      predepsano: 250,
      nejakaPoznamka: false
    },
    {
      id: '8344bc71dec1e99b7e1d01e',
      prijmeni: 'Kyselová',
      jmeno: 'Slavěna',
      narozeni: { den: 13, mesic: 8, rok: 2001 },
      obec: 'Aš',
      email: 'sks@por.cz',
      datum: new Date(AKTUALNI_DATUM_KONANI),
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 }
      },
      startCislo: 15,
      kod: '0234jsdj0jdaklsd',
      zaplaceno: 0,
      predepsano: 0,
      nejakaPoznamka: true
    },
    {
      id: '9ccbc71dedc1e99b7e1d671',
      prijmeni: 'Půlmaratonka',
      jmeno: 'Božena',
      narozeni: { den: 25, mesic: 7, rok: 2001 },
      obec: 'Velhartice',
      email: 'pul.ka@s.cz',
      datum: new Date('2019-05-12T00:00:00.000Z'),
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 }
      },
      startCislo: 8,
      kod: 'abc023skd204mvs345',
      zaplaceno: 0,
      predepsano: 200,
      nejakaPoznamka: false
    },
    {
      id: '7a09b1fd371dec1e99b7e142',
      prijmeni: 'Zralá',
      jmeno: 'Hana',
      narozeni: { den: 25, mesic: 7, rok: 1999 },
      obec: 'Bučovice',
      email: 'zrala.kl@s.cz',
      datum: new Date('2019-05-12T00:00:00.000Z'),
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 }
      },
      startCislo: 10,
      kod: 'abc023skd204mvs345',
      zaplaceno: 180,
      predepsano: 200,
      nejakaPoznamka: true
    }
  ];
  deepFreeze(state);

  const {
    entities,
    registrator: { [reduxName]: props }
  } = state;
  expect(getPrihlaseniDohlaseniSorted({ ...entities, ...props })).toEqual(selected);
});

it('getPrihlaseniSorted() by default - jen prihlášeni', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      [reduxName]: {
        dohlaseniFilter: false,
        prihlaseniFilter: true,
        sortColumn: undefined,
        sortDir: undefined,
        kategorieFilter: '',
        textFilter: ''
      }
    }
  };
  const selected = [
    {
      id: '9ccbc71dedc1e99b7e1d671',
      prijmeni: 'Půlmaratonka',
      jmeno: 'Božena',
      narozeni: { den: 25, mesic: 7, rok: 2001 },
      obec: 'Velhartice',
      email: 'pul.ka@s.cz',
      datum: new Date('2019-05-12T00:00:00.000Z'),
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 }
      },
      startCislo: 8,
      kod: 'abc023skd204mvs345',
      zaplaceno: 0,
      predepsano: 200,
      nejakaPoznamka: false
    },
    {
      id: 'f5c88400190a4bed88c76736',
      prijmeni: 'Smalt',
      jmeno: 'Josef',
      narozeni: { den: 25, mesic: 7, rok: 2001 },
      obec: 'Králův Dvůr',
      email: '',
      datum: new Date('2019-05-17T00:00:00.000Z'),
      kategorie: {
        id: '5a587e1a051c181132cf83b8',
        typ: 'maraton',
        pohlavi: 'muž',
        vek: { min: 18, max: 39 }
      },
      startCislo: 15,
      kod: 'rcc023skd204mvs345',
      zaplaceno: 200,
      predepsano: 200,
      nejakaPoznamka: false
    },
    {
      id: '7a09b1fd371dec1e99b7e142',
      prijmeni: 'Zralá',
      jmeno: 'Hana',
      narozeni: { den: 25, mesic: 7, rok: 1999 },
      obec: 'Bučovice',
      email: 'zrala.kl@s.cz',
      datum: new Date('2019-05-12T00:00:00.000Z'),
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 }
      },
      startCislo: 10,
      kod: 'abc023skd204mvs345',
      zaplaceno: 180,
      predepsano: 200,
      nejakaPoznamka: true
    }
  ];
  deepFreeze(state);

  const {
    entities,
    registrator: { [reduxName]: props }
  } = state;
  expect(getPrihlaseniDohlaseniSorted({ ...entities, ...props })).toEqual(selected);
});

it('getPrihlaseniSorted() by default - jen dohlášeni', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      [reduxName]: {
        dohlaseniFilter: true,
        prihlaseniFilter: false,
        sortColumn: undefined,
        sortDir: undefined,
        kategorieFilter: '',
        textFilter: ''
      }
    }
  };
  const selected = [
    {
      id: '5a09b1fd371dec1e99b7e1c9',
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: { rok: 1956 },
      obec: 'Ostrava 2',
      email: '',
      datum: new Date(AKTUALNI_DATUM_KONANI),
      kategorie: {
        id: '5a587e1b051c181132cf83d7',
        pohlavi: 'muž',
        typ: 'půlmaraton',
        vek: { min: 60, max: 150 }
      },
      startCislo: 17,
      kod: '10728864',
      zaplaceno: 250,
      predepsano: 250,
      nejakaPoznamka: false
    },
    {
      id: '8344bc71dec1e99b7e1d01e',
      prijmeni: 'Kyselová',
      jmeno: 'Slavěna',
      narozeni: { den: 13, mesic: 8, rok: 2001 },
      obec: 'Aš',
      email: 'sks@por.cz',
      datum: new Date(AKTUALNI_DATUM_KONANI),
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 }
      },
      startCislo: 15,
      kod: '0234jsdj0jdaklsd',
      zaplaceno: 0,
      predepsano: 0,
      nejakaPoznamka: true
    },
    {
      id: '7a09b1fd371dec1e99b7e142',
      prijmeni: 'Zralá',
      jmeno: 'Hana',
      narozeni: { den: 25, mesic: 7, rok: 1999 },
      obec: 'Bučovice',
      email: 'zrala.kl@s.cz',
      datum: new Date('2019-05-12T00:00:00.000Z'),
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 }
      },
      startCislo: 10,
      kod: 'abc023skd204mvs345',
      zaplaceno: 180,
      predepsano: 200,
      nejakaPoznamka: true
    }
  ];
  deepFreeze(state);

  const {
    entities,
    registrator: { [reduxName]: props }
  } = state;
  expect(getPrihlaseniDohlaseniSorted({ ...entities, ...props })).toEqual(selected);
});

it('getPrihlaseniSorted() by default - jen přihlášeni i dohlášeni', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      [reduxName]: {
        dohlaseniFilter: true,
        prihlaseniFilter: true,
        sortColumn: undefined,
        sortDir: undefined,
        kategorieFilter: '',
        textFilter: ''
      }
    }
  };
  const selected = [
    {
      id: '7a09b1fd371dec1e99b7e142',
      prijmeni: 'Zralá',
      jmeno: 'Hana',
      narozeni: { den: 25, mesic: 7, rok: 1999 },
      obec: 'Bučovice',
      email: 'zrala.kl@s.cz',
      datum: new Date('2019-05-12T00:00:00.000Z'),
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 }
      },
      startCislo: 10,
      kod: 'abc023skd204mvs345',
      zaplaceno: 180,
      predepsano: 200,
      nejakaPoznamka: true
    }
  ];
  deepFreeze(state);

  const {
    entities,
    registrator: { [reduxName]: props }
  } = state;
  expect(getPrihlaseniDohlaseniSorted({ ...entities, ...props })).toEqual(selected);
});
