import { getRozdily } from './stopkyProTypReducer';

it('getRozdily() - running', () => {
  const state = {
    entities: {
      stopky: {
        byTypy: {
          maraton: {
            base: '2018-09-06T07:23:32.0Z',
            delta: 'P0D',
            running: true,
          },
          půlmaraton: {
            base: '2018-09-06T07:14:33.5Z',
            delta: 'P0D',
            running: true,
          },
          cyklo: {
            base: '2018-09-06T08:14:20.0Z',
            delta: 'P0D',
            running: true,
          },
          koloběžka: {
            base: null,
            delta: 'PT0H15M0S',
            running: false,
          },
        },
        typy: ['maraton', 'půlmaraton', 'cyklo', 'koloběžka'],
      },
    },
  };
  const expected = [
    { name: 'půlmaraton', rozdil: { hours: '0', mins: '08', secs: '58', subsecs: '50' } },
    { name: 'cyklo', rozdil: { hours: '0', mins: '50', secs: '48', subsecs: '00' } },
    { name: 'koloběžka', rozdil: { hours: '-', mins: '--', secs: '--', subsecs: '--' } },
  ];

  expect(getRozdily({ state, typ: 'maraton' })).toEqual(expected);
});

it('getRozdily() - not running', () => {
  const state = {
    entities: {
      stopky: {
        byTypy: {
          maraton: {
            base: '2018-09-06T07:23:32.0Z',
            delta: 'P0D',
            running: true,
          },
          půlmaraton: {
            base: null,
            delta: 'PT02H12M45.4S',
            running: false,
          },
          cyklo: {
            base: null,
            delta: 'PT0H15M0S',
            running: false,
          },
          koloběžka: {
            base: null,
            delta: 'PT0H0M13.2S',
            running: false,
          },
        },
        typy: ['maraton', 'půlmaraton', 'cyklo', 'koloběžka'],
      },
    },
  };
  const expected = [
    { name: 'maraton', rozdil: { hours: '-', mins: '--', secs: '--', subsecs: '--' } },
    { name: 'půlmaraton', rozdil: { hours: '1', mins: '57', secs: '45', subsecs: '40' } },
    { name: 'koloběžka', rozdil: { hours: '0', mins: '14', secs: '46', subsecs: '80' } },
  ];

  expect(getRozdily({ state, typ: 'cyklo' })).toEqual(expected);
});
