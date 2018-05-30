import ucastniciTestData from '../entities/ucastnici/ucastniciTestData';
import { predepsaneStartovne, provedenePlatby } from './platby';

it('provedenePlatby()', () => {
  const platby = [
    { castka: 250, datum: '2018-06-09T00:00:00.000Z', typ: 'hotově' },
    { castka: 20, datum: '2018-06-09T00:00:00.000Z', typ: 'hotově' }
  ];
  const selected = {
    platby: [
      { castka: 250, datum: '9. 6. 2018', typ: 'hotově' },
      { castka: 20, datum: '9. 6. 2018', typ: 'hotově' }
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

it('predepsaneStartovne() - přihláška s včasným datem a bez plateb [jePrihlaskou]', () => {
  const prihlaska = { typ: 'maraton', datum: '2018-05-30' };
  const expected = { polozky: [{ castka: 200, duvod: 'předem' }], suma: 200 };

  expect(
    predepsaneStartovne({ ...ucastniciTestData.entities, prihlaska, jePrihlaskou: true })
  ).toEqual(expected);
});

it('predepsaneStartovne() - přihláška s včasným datem a s včasnou dostatečnou platbou', () => {
  const platby = [{ castka: 200, datum: '2018-05-25', typ: 'hotově' }];
  const prihlaska = { typ: 'maraton', datum: '2018-05-24' };
  const expected = { polozky: [{ castka: 200, duvod: 'předem' }], suma: 200 };

  expect(predepsaneStartovne({ ...ucastniciTestData.entities, prihlaska, platby })).toEqual(
    expected
  );
});

it('predepsaneStartovne() - přihláška s včasným datem a s včasnou nedostatečnou platbou', () => {
  const platby = [{ castka: 100, datum: '2018-05-25', typ: 'převodem' }];
  const prihlaska = { typ: 'cyklo', datum: '2018-05-24' };
  const expected = {
    polozky: [{ castka: 250, duvod: 'na místě' }, { castka: 20, duvod: 'záloha' }],
    suma: 270
  };

  expect(predepsaneStartovne({ ...ucastniciTestData.entities, prihlaska, platby })).toEqual(
    expected
  );
});

it('predepsaneStartovne() - přihláška bez data a bez plateb', () => {
  const prihlaska = { typ: 'maraton' };
  const expected = { polozky: [{ castka: 250, duvod: 'na místě' }], suma: 250 };

  expect(predepsaneStartovne({ ...ucastniciTestData.entities, prihlaska, platby: [] })).toEqual(
    expected
  );
});

it('predepsaneStartovne() - přihláška bez data a s včasnou platbou', () => {
  const platby = [{ castka: 200, datum: '2018-05-30', typ: 'hotově' }];
  const prihlaska = { typ: 'maraton' };
  const expected = { polozky: [{ castka: 200, duvod: 'předem' }], suma: 200 };

  expect(predepsaneStartovne({ ...ucastniciTestData.entities, prihlaska, platby })).toEqual(
    expected
  );
});

it('predepsaneStartovne() - přihláška na místě', () => {
  const prihlaska = { typ: 'maraton', datum: new Date('2018-06-09').toJSON() };
  const expected = { polozky: [{ castka: 250, duvod: 'na místě' }], suma: 250 };

  expect(predepsaneStartovne({ ...ucastniciTestData.entities, prihlaska })).toEqual(expected);
});
