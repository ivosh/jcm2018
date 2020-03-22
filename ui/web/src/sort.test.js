import deepFreeze from 'deep-freeze';
import {
  narozeniSortMethod,
  prijmeniJmenoNarozeniSortMethod,
  reverseSortDirType,
  sortForColumn,
  SortDirTypes,
} from './sort';

const narozeniSortMethodDescending = (a, b) => narozeniSortMethod(a, b, true);

const data = [
  {
    prijmeni: 'Balabák',
    jmeno: 'Roman',
    narozeni: { rok: 1956 },
    obec: 'Ostrava 2',
    email: '',
    datum: new Date('2017-06-09T00:00:00.000Z'),
    kategorie: {
      pohlavi: 'muž',
      typ: 'půlmaraton',
      vek: { min: 60, max: 150 },
    },
    startCislo: 17,
    kod: '10728864',
    zaplaceno: 250,
    predepsano: 200,
    dokonceno: undefined,
    cas: undefined,
  },
  {
    prijmeni: 'Kyselová',
    jmeno: 'Slavěna',
    narozeni: { den: 13, mesic: 8, rok: 2001 },
    obec: 'Aš',
    email: 'sks@por.cz',
    datum: new Date('2018-06-09T00:00:00.000Z'),
    kategorie: {
      typ: 'půlmaraton',
      pohlavi: 'žena',
      vek: { min: 40, max: 49 },
    },
    zaplaceno: 0,
    predepsano: 200,
    dokonceno: false,
    cas: undefined,
  },
  {
    prijmeni: 'Sukdoláková',
    jmeno: 'Martina',
    narozeni: { rok: 1963, mesic: 12, den: 7 },
    pohlavi: 'žena',
    obec: 'Zlín',
    email: '',
    datum: new Date('2016-06-11T00:00:00.000Z'),
    kategorie: {
      typ: 'maraton',
      pohlavi: 'žena',
      vek: { min: 50, max: 59 },
    },
    zaplaceno: 0,
    dokonceno: true,
    cas: 'PT3H07M56.12S',
  },
  {
    prijmeni: 'Zralá',
    jmeno: 'Hana',
    narozeni: { den: 25, mesic: 7, rok: 1999 },
    obec: 'Bučovice',
    email: 'zrala.kl@s.cz',
    datum: new Date('2018-06-09T00:00:00.000Z'),
    kategorie: {
      typ: 'půlmaraton',
      pohlavi: 'žena',
      vek: { min: 18, max: 39 },
    },
    startCislo: 10,
    kod: 'abc023skd204mvs345',
    zaplaceno: 100,
    predepsano: 200,
    dokonceno: true,
    cas: 'PT1H23M32.56S',
  },
];
deepFreeze(data);

it('reverseSortDirType - default', () => {
  expect(reverseSortDirType(undefined)).toEqual('asc');
});

it('reverseSortDirType - asc->desc', () => {
  expect(reverseSortDirType(SortDirTypes.ASC)).toEqual('desc');
});

it('reverseSortDirType - desc->asc', () => {
  expect(reverseSortDirType(SortDirTypes.DESC)).toEqual('asc');
});

it('narozeniSort(desc=false) - nulls', () => {
  const narozeni = [null, { rok: 1978, mesic: 8, den: 7 }, null];
  expect(narozeni.sort(narozeniSortMethod)).toEqual([{ rok: 1978, mesic: 8, den: 7 }, null, null]);
});

it('narozeniSort(desc=false) - jen roky', () => {
  const narozeni = [{ rok: 1978 }, { rok: 1956 }, { rok: 2001 }];
  expect(narozeni.sort(narozeniSortMethod)).toEqual([{ rok: 1956 }, { rok: 1978 }, { rok: 2001 }]);
});

it('narozeniSort(desc=false) - roky, dny, měsíce', () => {
  const narozeni = [
    { rok: 1978, mesic: 4, den: 7 },
    { rok: 1956, mesic: 2, den: 25 },
    { rok: 2001, mesic: 4, den: 13 },
    { rok: 1956, mesic: 1, den: 26 },
    { rok: 2001, mesic: 4, den: 12 },
    { rok: 1956, mesic: 2, den: 25 },
  ];
  expect(narozeni.sort(narozeniSortMethod)).toEqual([
    { rok: 1956, mesic: 1, den: 26 },
    { rok: 1956, mesic: 2, den: 25 },
    { rok: 1956, mesic: 2, den: 25 },
    { rok: 1978, mesic: 4, den: 7 },
    { rok: 2001, mesic: 4, den: 12 },
    { rok: 2001, mesic: 4, den: 13 },
  ]);
});

it('narozeniSort(desc=false) - prázdný měsíc a den', () => {
  const narozeni = [
    { rok: 1978, mesic: 8, den: 7 },
    { rok: 1978 },
    { rok: 1978, mesic: 8, den: 6 },
  ];
  expect(narozeni.sort(narozeniSortMethod)).toEqual([
    { rok: 1978, mesic: 8, den: 6 },
    { rok: 1978, mesic: 8, den: 7 },
    { rok: 1978 },
  ]);
});

it('narozeniSort(desc=true) - nulls', () => {
  const narozeni = [null, { rok: 1978, mesic: 8, den: 7 }, null];
  expect(narozeni.sort(narozeniSortMethodDescending)).toEqual([
    null,
    null,
    { rok: 1978, mesic: 8, den: 7 },
  ]);
});

it('narozeniSort(desc=true) - jen roky', () => {
  const narozeni = [{ rok: 1978 }, { rok: 1956 }, { rok: 2001 }];
  expect(narozeni.sort(narozeniSortMethodDescending)).toEqual([
    { rok: 1956 },
    { rok: 1978 },
    { rok: 2001 },
  ]);
});

it('narozeniSort(desc=true) - roky, dny, měsíce', () => {
  const narozeni = [
    { rok: 1978, mesic: 4, den: 7 },
    { rok: 1956, mesic: 2, den: 25 },
    { rok: 2001, mesic: 4, den: 13 },
    { rok: 1956, mesic: 1, den: 26 },
    { rok: 2001, mesic: 4, den: 12 },
    { rok: 1956, mesic: 2, den: 25 },
  ];
  expect(narozeni.sort(narozeniSortMethodDescending)).toEqual([
    { rok: 1956, mesic: 1, den: 26 },
    { rok: 1956, mesic: 2, den: 25 },
    { rok: 1956, mesic: 2, den: 25 },
    { rok: 1978, mesic: 4, den: 7 },
    { rok: 2001, mesic: 4, den: 12 },
    { rok: 2001, mesic: 4, den: 13 },
  ]);
});

it('narozeniSort(desc=true) - prázdný měsíc a den', () => {
  const narozeni = [
    { rok: 1978, mesic: 8, den: 7, id: 1 },
    { rok: 1978, id: 2 },
    { rok: 1978, mesic: 10, id: 3 },
    { rok: 1978, mesic: 10, id: 4 },
    { rok: 1978, mesic: 8, den: 6, id: 5 },
    { rok: 1978, mesic: 8, den: 5, id: 6 },
    { rok: 1978, mesic: 9, id: 7 },
    { rok: 1978, mesic: 10, id: 8 },
  ];
  expect(narozeni.sort(narozeniSortMethodDescending)).toEqual([
    { rok: 1978, id: 2 },
    { rok: 1978, mesic: 8, den: 5, id: 6 },
    { rok: 1978, mesic: 8, den: 6, id: 5 },
    { rok: 1978, mesic: 8, den: 7, id: 1 },
    { rok: 1978, mesic: 9, id: 7 },
    { rok: 1978, mesic: 10, id: 3 },
    { rok: 1978, mesic: 10, id: 4 },
    { rok: 1978, mesic: 10, id: 8 },
  ]);
});

it('narozeniSort(desc=true) - prázdný den', () => {
  const narozeni = [{ rok: 1978, mesic: 8 }, { rok: 1978 }, { rok: 1978, mesic: 8, den: 6 }];
  expect(narozeni.sort(narozeniSortMethodDescending)).toEqual([
    { rok: 1978 },
    { rok: 1978, mesic: 8 },
    { rok: 1978, mesic: 8, den: 6 },
  ]);
});

it('prijmeniJmenoNarozeniSortMethod - podle jména', () => {
  const ucastnici = [
    { prijmeni: 'Bubáková', jmeno: 'Milena', narozeni: { rok: 1978, mesic: 8, den: 7 } },
    { prijmeni: 'Bubáková', jmeno: 'Alena', narozeni: { rok: 1999, mesic: 1, den: 23 } },
  ];
  expect(ucastnici.sort(prijmeniJmenoNarozeniSortMethod)).toEqual([
    { prijmeni: 'Bubáková', jmeno: 'Alena', narozeni: { rok: 1999, mesic: 1, den: 23 } },
    { prijmeni: 'Bubáková', jmeno: 'Milena', narozeni: { rok: 1978, mesic: 8, den: 7 } },
  ]);
});

it('prijmeniJmenoNarozeniSortMethod - podle narození', () => {
  const ucastnici = [
    { prijmeni: 'Bubáková', jmeno: 'Milena', narozeni: { rok: 1999, mesic: 8, den: 7 } },
    { prijmeni: 'Bubáková', jmeno: 'Milena', narozeni: { rok: 1968, mesic: 1, den: 23 } },
  ];
  expect(ucastnici.sort(prijmeniJmenoNarozeniSortMethod)).toEqual([
    { prijmeni: 'Bubáková', jmeno: 'Milena', narozeni: { rok: 1968, mesic: 1, den: 23 } },
    { prijmeni: 'Bubáková', jmeno: 'Milena', narozeni: { rok: 1999, mesic: 8, den: 7 } },
  ]);
});

it('sortForColumn - prijmeni ASC', () => {
  expect(sortForColumn({ data, sortColumn: 'prijmeni', sortDir: SortDirTypes.ASC })).toEqual([
    data[0],
    data[1],
    data[2],
    data[3],
  ]);
});

it('sortForColumn - prijmeni DESC', () => {
  expect(sortForColumn({ data, sortColumn: 'prijmeni', sortDir: SortDirTypes.DESC })).toEqual([
    data[3],
    data[2],
    data[1],
    data[0],
  ]);
});

it('sortForColumn - jmeno ASC', () => {
  expect(sortForColumn({ data, sortColumn: 'jmeno', sortDir: SortDirTypes.ASC })).toEqual([
    data[3],
    data[2],
    data[0],
    data[1],
  ]);
});

it('sortForColumn - jmeno DESC', () => {
  expect(sortForColumn({ data, sortColumn: 'jmeno', sortDir: SortDirTypes.DESC })).toEqual([
    data[1],
    data[0],
    data[2],
    data[3],
  ]);
});

it('sortForColumn - obec ASC', () => {
  expect(sortForColumn({ data, sortColumn: 'obec', sortDir: SortDirTypes.ASC })).toEqual([
    data[1],
    data[3],
    data[0],
    data[2],
  ]);
});

it('sortForColumn - email DESC', () => {
  expect(sortForColumn({ data, sortColumn: 'email', sortDir: SortDirTypes.DESC })).toEqual([
    data[3],
    data[1],
    data[2],
    data[0],
  ]);
});

it('sortForColumn - datum ASC', () => {
  expect(sortForColumn({ data, sortColumn: 'datum', sortDir: SortDirTypes.ASC })).toEqual([
    data[2],
    data[0],
    data[1],
    data[3],
  ]);
});

it('sortForColumn - datum DESC', () => {
  expect(sortForColumn({ data, sortColumn: 'datum', sortDir: SortDirTypes.DESC })).toEqual([
    data[3],
    data[1],
    data[0],
    data[2],
  ]);
});

it('sortForColumn - kategorie ASC', () => {
  expect(sortForColumn({ data, sortColumn: 'kategorie', sortDir: SortDirTypes.ASC })).toEqual([
    data[2],
    data[0],
    data[3],
    data[1],
  ]);
});

it('sortForColumn - kategorie DESC', () => {
  expect(sortForColumn({ data, sortColumn: 'kategorie', sortDir: SortDirTypes.DESC })).toEqual([
    data[1],
    data[3],
    data[0],
    data[2],
  ]);
});

it('sortForColumn - startCislo ASC', () => {
  expect(sortForColumn({ data, sortColumn: 'startCislo', sortDir: SortDirTypes.ASC })).toEqual([
    data[3],
    data[0],
    data[1],
    data[2],
  ]);
});

it('sortForColumn - startCislo DESC', () => {
  expect(sortForColumn({ data, sortColumn: 'startCislo', sortDir: SortDirTypes.DESC })).toEqual([
    data[0],
    data[3],
    data[2],
    data[1],
  ]);
});

it('sortForColumn - zaplaceno ASC', () => {
  expect(sortForColumn({ data, sortColumn: 'zaplaceno', sortDir: SortDirTypes.ASC })).toEqual([
    data[1],
    data[2],
    data[3],
    data[0],
  ]);
});

it('sortForColumn - zaplaceno DESC', () => {
  expect(sortForColumn({ data, sortColumn: 'zaplaceno', sortDir: SortDirTypes.DESC })).toEqual([
    data[0],
    data[3],
    data[2],
    data[1],
  ]);
});

it('sortForColumn - dokonceno ASC', () => {
  expect(sortForColumn({ data, sortColumn: 'dokonceno', sortDir: SortDirTypes.ASC })).toEqual([
    data[2],
    data[3],
    data[1],
    data[0],
  ]);
});

it('sortForColumn - dokonceno DESC', () => {
  expect(sortForColumn({ data, sortColumn: 'dokonceno', sortDir: SortDirTypes.DESC })).toEqual([
    data[0],
    data[1],
    data[3],
    data[2],
  ]);
});

it('sortForColumn - cas ASC', () => {
  expect(sortForColumn({ data, sortColumn: 'cas', sortDir: SortDirTypes.ASC })).toEqual([
    data[3],
    data[2],
    data[0],
    data[1],
  ]);
});

it('sortForColumn - cas DESC', () => {
  expect(sortForColumn({ data, sortColumn: 'cas', sortDir: SortDirTypes.DESC })).toEqual([
    data[2],
    data[3],
    data[1],
    data[0],
  ]);
});
