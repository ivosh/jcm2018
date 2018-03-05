import moment from 'moment';
import {
  convertDuration,
  narozeniSortMethod,
  narozeniToStr,
  prijmeniJmenoNarozeniSortMethod
} from './Util';

const narozeniSortMethodDescending = (a, b) => narozeniSortMethod(a, b, true);

it('null', () => {
  const expected = { hours: '-', mins: '--', secs: '--', subsecs: '--' };
  expect(convertDuration(null)).toEqual(expected);
});

it('nula', () => {
  const expected = { hours: '0', mins: '00', secs: '00', subsecs: '00' };
  expect(convertDuration(moment.duration(0))).toEqual(expected);
});

it('jen pár milisekund', () => {
  const expected = { hours: '0', mins: '00', secs: '00', subsecs: '00' };
  expect(convertDuration(moment.duration('PT0H0M0.006S'))).toEqual(expected);
});

it('jen pár desítek milisekund', () => {
  const expected = { hours: '0', mins: '00', secs: '00', subsecs: '06' };
  expect(convertDuration(moment.duration('PT0H0M0.060S'))).toEqual(expected);
});

it('jen pár stovek milisekund', () => {
  const expected = { hours: '0', mins: '00', secs: '00', subsecs: '64' };
  expect(convertDuration(moment.duration('PT0H0M0.640S'))).toEqual(expected);
});

it('jen pár sekund', () => {
  const expected = { hours: '0', mins: '00', secs: '07', subsecs: '64' };
  expect(convertDuration(moment.duration('PT0H0M07.640S'))).toEqual(expected);
});

it('jen pár desítek sekund', () => {
  const expected = { hours: '0', mins: '00', secs: '17', subsecs: '64' };
  expect(convertDuration(moment.duration('PT0H0M17.643S'))).toEqual(expected);
});

it('jen pár minut', () => {
  const expected = { hours: '0', mins: '03', secs: '17', subsecs: '64' };
  expect(convertDuration(moment.duration('PT0H3M17.643S'))).toEqual(expected);
});

it('jen pár hodin', () => {
  const expected = { hours: '4', mins: '53', secs: '17', subsecs: '64' };
  expect(convertDuration(moment.duration('PT4H53M17.643S'))).toEqual(expected);
});

it('narozeniToStr - celé datum', () => {
  expect(narozeniToStr({ den: 7, mesic: 12, rok: 1956 })).toEqual('7. 12. 1956');
});

it('narozeniToStr - jen rok', () => {
  expect(narozeniToStr({ rok: 1956 })).toEqual('1956');
});

it('narozeniToStr - vůbec nic', () => {
  expect(narozeniToStr({})).toEqual('');
});

/* ---------------------------------- sorting --------------------------------------------------- */

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
    { rok: 1956, mesic: 2, den: 25 }
  ];
  expect(narozeni.sort(narozeniSortMethod)).toEqual([
    { rok: 1956, mesic: 1, den: 26 },
    { rok: 1956, mesic: 2, den: 25 },
    { rok: 1956, mesic: 2, den: 25 },
    { rok: 1978, mesic: 4, den: 7 },
    { rok: 2001, mesic: 4, den: 12 },
    { rok: 2001, mesic: 4, den: 13 }
  ]);
});

it('narozeniSort(desc=false) - prázdný měsíc a den', () => {
  const narozeni = [
    { rok: 1978, mesic: 8, den: 7 },
    { rok: 1978 },
    { rok: 1978, mesic: 8, den: 6 }
  ];
  expect(narozeni.sort(narozeniSortMethod)).toEqual([
    { rok: 1978, mesic: 8, den: 6 },
    { rok: 1978, mesic: 8, den: 7 },
    { rok: 1978 }
  ]);
});

it('narozeniSort(desc=true) - nulls', () => {
  const narozeni = [null, { rok: 1978, mesic: 8, den: 7 }, null];
  expect(narozeni.sort(narozeniSortMethodDescending)).toEqual([
    null,
    null,
    { rok: 1978, mesic: 8, den: 7 }
  ]);
});

it('narozeniSort(desc=true) - jen roky', () => {
  const narozeni = [{ rok: 1978 }, { rok: 1956 }, { rok: 2001 }];
  expect(narozeni.sort(narozeniSortMethodDescending)).toEqual([
    { rok: 1956 },
    { rok: 1978 },
    { rok: 2001 }
  ]);
});

it('narozeniSort(desc=true) - roky, dny, měsíce', () => {
  const narozeni = [
    { rok: 1978, mesic: 4, den: 7 },
    { rok: 1956, mesic: 2, den: 25 },
    { rok: 2001, mesic: 4, den: 13 },
    { rok: 1956, mesic: 1, den: 26 },
    { rok: 2001, mesic: 4, den: 12 },
    { rok: 1956, mesic: 2, den: 25 }
  ];
  expect(narozeni.sort(narozeniSortMethodDescending)).toEqual([
    { rok: 1956, mesic: 1, den: 26 },
    { rok: 1956, mesic: 2, den: 25 },
    { rok: 1956, mesic: 2, den: 25 },
    { rok: 1978, mesic: 4, den: 7 },
    { rok: 2001, mesic: 4, den: 12 },
    { rok: 2001, mesic: 4, den: 13 }
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
    { rok: 1978, mesic: 10, id: 8 }
  ];
  expect(narozeni.sort(narozeniSortMethodDescending)).toEqual([
    { rok: 1978, id: 2 },
    { rok: 1978, mesic: 8, den: 5, id: 6 },
    { rok: 1978, mesic: 8, den: 6, id: 5 },
    { rok: 1978, mesic: 8, den: 7, id: 1 },
    { rok: 1978, mesic: 9, id: 7 },
    { rok: 1978, mesic: 10, id: 3 },
    { rok: 1978, mesic: 10, id: 4 },
    { rok: 1978, mesic: 10, id: 8 }
  ]);
});

it('narozeniSort(desc=true) - prázdný den', () => {
  const narozeni = [{ rok: 1978, mesic: 8 }, { rok: 1978 }, { rok: 1978, mesic: 8, den: 6 }];
  expect(narozeni.sort(narozeniSortMethodDescending)).toEqual([
    { rok: 1978 },
    { rok: 1978, mesic: 8 },
    { rok: 1978, mesic: 8, den: 6 }
  ]);
});

it('prijmeniJmenoNarozeniSortMethod - podle jména', () => {
  const ucastnici = [
    { prijmeni: 'Bubáková', jmeno: 'Milena', narozeni: { rok: 1978, mesic: 8, den: 7 } },
    { prijmeni: 'Bubáková', jmeno: 'Alena', narozeni: { rok: 1999, mesic: 1, den: 23 } }
  ];
  expect(ucastnici.sort(prijmeniJmenoNarozeniSortMethod)).toEqual([
    { prijmeni: 'Bubáková', jmeno: 'Alena', narozeni: { rok: 1999, mesic: 1, den: 23 } },
    { prijmeni: 'Bubáková', jmeno: 'Milena', narozeni: { rok: 1978, mesic: 8, den: 7 } }
  ]);
});

it('prijmeniJmenoNarozeniSortMethod - podle narození', () => {
  const ucastnici = [
    { prijmeni: 'Bubáková', jmeno: 'Milena', narozeni: { rok: 1999, mesic: 8, den: 7 } },
    { prijmeni: 'Bubáková', jmeno: 'Milena', narozeni: { rok: 1968, mesic: 1, den: 23 } }
  ];
  expect(ucastnici.sort(prijmeniJmenoNarozeniSortMethod)).toEqual([
    { prijmeni: 'Bubáková', jmeno: 'Milena', narozeni: { rok: 1968, mesic: 1, den: 23 } },
    { prijmeni: 'Bubáková', jmeno: 'Milena', narozeni: { rok: 1999, mesic: 8, den: 7 } }
  ]);
});
