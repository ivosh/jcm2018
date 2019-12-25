import { AKTUALNI_ROK } from '../constants';
import ucastniciTestData, { AKTUALNI_DATUM_KONANI } from '../entities/ucastnici/ucastniciTestData';
import { predepsaneStartovne, provedenePlatby } from './platby';

it('provedenePlatby()', () => {
  const platby = [
    { castka: 250, datum: AKTUALNI_DATUM_KONANI, typ: 'hotově' },
    { castka: 20, datum: AKTUALNI_DATUM_KONANI, typ: 'hotově' }
  ];
  const selected = {
    platby: [
      { castka: 250, datum: `6. 6. ${AKTUALNI_ROK}`, typ: 'hotově' },
      { castka: 20, datum: `6. 6. ${AKTUALNI_ROK}`, typ: 'hotově' }
    ],
    suma: 270
  };
  expect(provedenePlatby(platby)).toEqual(selected);
});

it('predepsaneStartovne() - po slevě 0 Kč', () => {
  const prihlaska = { typ: 'maraton', startovnePoSleve: 0 };
  const expected = { polozky: [{ castka: 0, duvod: 'po slevě' }], suma: 0 };

  expect(predepsaneStartovne({ ...ucastniciTestData.entities, prihlaska })).toEqual(expected);
});

it('predepsaneStartovne() - po slevě 100 Kč', () => {
  const prihlaska = { typ: 'maraton', startovnePoSleve: 100 };
  const expected = { polozky: [{ castka: 100, duvod: 'po slevě' }], suma: 100 };

  expect(predepsaneStartovne({ ...ucastniciTestData.entities, prihlaska })).toEqual(expected);
});

it('predepsaneStartovne() - včasná přihláška a včasná platba', () => {
  const prihlaska = { typ: 'maraton', datum: '2020-05-30' };
  const platby = [{ castka: 250, datum: '2020-06-02', typ: 'převodem' }];
  const expected = { polozky: [{ castka: 250, duvod: 'předem' }], suma: 250 };

  expect(predepsaneStartovne({ ...ucastniciTestData.entities, prihlaska, platby })).toEqual(
    expected
  );
});

it('predepsaneStartovne() - včasná přihláška a včasná (ale nedostatečná) platba', () => {
  const prihlaska = { typ: 'maraton', datum: '2020-05-31' };
  const platby = [{ castka: 230, datum: '2020-06-03', typ: 'převodem' }];
  const expected = {
    polozky: [{ castka: 350, duvod: 'na místě (nedostatečná platba)' }],
    suma: 350
  };

  expect(predepsaneStartovne({ ...ucastniciTestData.entities, prihlaska, platby })).toEqual(
    expected
  );
});

it('predepsaneStartovne() - včasná přihláška a včasná platba (bez zálohy)', () => {
  const prihlaska = { typ: 'cyklo', datum: '2020-05-31' };
  const platby = [{ castka: 250, datum: '2020-06-03', typ: 'převodem' }];
  const expected = {
    polozky: [
      { castka: 250, duvod: 'předem' },
      { castka: 20, duvod: 'záloha' }
    ],
    suma: 270
  };

  expect(predepsaneStartovne({ ...ucastniciTestData.entities, prihlaska, platby })).toEqual(
    expected
  );
});

it('predepsaneStartovne() - včasná přihláška a pozdní platba', () => {
  const prihlaska = { typ: 'maraton', datum: '2020-05-30' };
  const platby = [{ castka: 250, datum: '2020-06-06', typ: 'převodem' }];
  const expected = { polozky: [{ castka: 350, duvod: 'na místě (pozdní platba)' }], suma: 350 };

  expect(predepsaneStartovne({ ...ucastniciTestData.entities, prihlaska, platby })).toEqual(
    expected
  );
});

it('predepsaneStartovne() - včasná přihláška a žádná platba', () => {
  const prihlaska = { typ: 'maraton', datum: '2020-05-30' };
  const platby = [];
  const expected = { polozky: [{ castka: 350, duvod: 'na místě (žádná platba)' }], suma: 350 };

  expect(predepsaneStartovne({ ...ucastniciTestData.entities, prihlaska, platby })).toEqual(
    expected
  );
});

it('predepsaneStartovne() - přihláška bez data', () => {
  const prihlaska = { typ: 'maraton' };
  const expected = { polozky: [{ castka: 350, duvod: 'na místě (pozdní přihláška)' }], suma: 350 };

  expect(predepsaneStartovne({ ...ucastniciTestData.entities, prihlaska })).toEqual(expected);
});

it('predepsaneStartovne() - přihláška na místě', () => {
  const prihlaska = { typ: 'maraton', datum: new Date(AKTUALNI_DATUM_KONANI).toJSON() };
  const expected = { polozky: [{ castka: 350, duvod: 'na místě' }], suma: 350 };

  expect(predepsaneStartovne({ ...ucastniciTestData.entities, prihlaska })).toEqual(expected);
});
