import { provedenePlatby } from './platby';

it('provedenePlatby', () => {
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
