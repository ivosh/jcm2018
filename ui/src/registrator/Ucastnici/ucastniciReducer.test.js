import deepFreeze from 'deep-freeze';
import ucastniciReducer, { getUcastniciOverviewSorted } from './ucastniciReducer';
import { receiveUcastnici } from './UcastniciActions';

it('nic se nestalo 1', () => {
  const stateBefore = undefined;

  const stateAfter = ucastniciReducer(stateBefore, {});
  expect(stateAfter).toEqual({ allIds: [], byIds: {} });
});

it('nic se nestalo 2', () => {
  const stateBefore = { allIds: [1], byIds: { 1: { 2017: { udaje: null } } } };
  const stateAfter = { ...stateBefore };
  deepFreeze(stateBefore);

  expect(ucastniciReducer(stateBefore, {})).toEqual(stateAfter);
});

it('po načtení účastníků', () => {
  const json = {
    code: 'ok',
    response: [
      {
        id: '6f09b1fd371dec1e99b7e1c9',
        __v: 0,
        ucasti: [
          {
            rok: 2016,
            udaje: {
              prijmeni: 'Sukdoláková',
              jmeno: 'Martina',
              narozeni: { rok: 1963 },
              pohlavi: 'zena',
              obec: 'Zlín',
              stat: 'Česká republika'
            }
          }
        ]
      },
      {
        id: '5a09b1fd371dec1e99b7e1c9',
        __v: 0,
        ucasti: [
          {
            rok: 2017,
            udaje: {
              prijmeni: 'Balabák',
              jmeno: 'Roman',
              narozeni: { rok: 1956 },
              pohlavi: 'muz',
              obec: 'Ostrava 1',
              stat: 'Česká republika'
            }
          },
          {
            rok: 2018,
            udaje: {
              prijmeni: 'Balabák',
              jmeno: 'Roman',
              narozeni: { rok: 1956 },
              pohlavi: 'muz',
              obec: 'Ostrava 2',
              stat: 'Česká republika'
            }
          }
        ]
      }
    ],
    requestId: '0.9310306652587377'
  };

  const stateBefore = { allIds: [1], byIds: { 1: { 2017: { udaje: null } } } };
  const stateAfter = {
    allIds: ['6f09b1fd371dec1e99b7e1c9', '5a09b1fd371dec1e99b7e1c9'],
    byIds: {
      '6f09b1fd371dec1e99b7e1c9': {
        roky: [2016],
        2016: {
          udaje: {
            prijmeni: 'Sukdoláková',
            jmeno: 'Martina',
            narozeni: { rok: 1963 },
            pohlavi: 'zena',
            obec: 'Zlín',
            stat: 'Česká republika'
          }
        }
      },
      '5a09b1fd371dec1e99b7e1c9': {
        roky: [2018, 2017],
        2018: {
          udaje: {
            prijmeni: 'Balabák',
            jmeno: 'Roman',
            narozeni: { rok: 1956 },
            pohlavi: 'muz',
            obec: 'Ostrava 2',
            stat: 'Česká republika'
          }
        },
        2017: {
          udaje: {
            prijmeni: 'Balabák',
            jmeno: 'Roman',
            narozeni: { rok: 1956 },
            pohlavi: 'muz',
            obec: 'Ostrava 1',
            stat: 'Česká republika'
          }
        }
      }
    }
  };
  deepFreeze(stateBefore);

  expect(ucastniciReducer(stateBefore, receiveUcastnici(json))).toEqual(stateAfter);
});

it('getUcastniciOverviewSorted()', () => {
  const state = {
    allIds: ['6f09b1fd371dec1e99b7e1c9', '5a09b1fd371dec1e99b7e1c9'],
    byIds: {
      '6f09b1fd371dec1e99b7e1c9': {
        roky: [2016],
        2016: {
          udaje: {
            prijmeni: 'Sukdoláková',
            jmeno: 'Martina',
            narozeni: { rok: 1963 },
            pohlavi: 'zena',
            obec: 'Zlín',
            stat: 'Česká republika'
          }
        }
      },
      '5a09b1fd371dec1e99b7e1c9': {
        roky: [2018, 2017],
        2018: {
          udaje: {
            prijmeni: 'Balabák',
            jmeno: 'Roman',
            narozeni: { rok: 1956 },
            pohlavi: 'muz',
            obec: 'Ostrava 2',
            stat: 'Česká republika'
          }
        },
        2017: {
          udaje: {
            prijmeni: 'Balabák',
            jmeno: 'Roman',
            narozeni: { rok: 1957 },
            pohlavi: 'muz',
            obec: 'Ostrava 1',
            stat: 'Česká republika'
          }
        }
      }
    }
  };
  const selected = [
    { id: '5a09b1fd371dec1e99b7e1c9', prijmeni: 'Balabák', jmeno: 'Roman', narozeni: 1956 },
    { id: '6f09b1fd371dec1e99b7e1c9', prijmeni: 'Sukdoláková', jmeno: 'Martina', narozeni: 1963 }
  ];
  deepFreeze(state);

  expect(getUcastniciOverviewSorted(state)).toEqual(selected);
});
