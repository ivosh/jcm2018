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

it('predepsaneStartovne() - přihláška předem', () => {
  const prihlaska = { typ: 'maraton', datum: new Date('2018-05-24').toJSON() };
  const expected = { polozky: [{ castka: 200, duvod: 'předem' }], suma: 200 };

  expect(predepsaneStartovne({ ...ucastniciTestData.entities, prihlaska })).toEqual(expected);
});

it('predepsaneStartovne() - přihláška bez data', () => {
  const prihlaska = { typ: 'maraton' };
  const expected = { polozky: [{ castka: 250, duvod: 'na místě' }], suma: 250 };

  expect(predepsaneStartovne({ ...ucastniciTestData.entities, prihlaska })).toEqual(expected);
});
it('predepsaneStartovne() - přihláška na místě', () => {
  const prihlaska = { typ: 'maraton', datum: new Date('2018-06-09').toJSON() };
  const expected = { polozky: [{ castka: 250, duvod: 'na místě' }], suma: 250 };

  expect(predepsaneStartovne({ ...ucastniciTestData.entities, prihlaska })).toEqual(expected);
});
