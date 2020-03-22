import deepFreeze from 'deep-freeze';
import { AKTUALNI_ROK } from '../../constants';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import { getPokladna } from './pokladnaReducer';

it('getPokladna() - ucastniciTestData', () => {
  const state = ucastniciTestData;
  deepFreeze(state);
  const pokladna = getPokladna({ ...state.entities });
  const expected = {
    total: {
      odstartovano: 3,
      suma: 780,
      ucastniku: 3,
      typy: {
        hotově: {
          counts: {
            80: 1,
            350: 1,
          },
          suma: 430,
        },
        převodem: {
          counts: {
            100: 1,
            250: 1,
          },
          suma: 350,
        },
      },
    },
    typy: {
      maraton: {
        odstartovano: 0,
        suma: 250,
        ucastniku: 1,
        typy: {
          převodem: {
            counts: {
              250: 1,
            },
            suma: 250,
          },
        },
      },
      půlmaraton: {
        odstartovano: 3,
        suma: 530,
        ucastniku: 2,
        typy: {
          hotově: {
            counts: {
              80: 1,
              350: 1,
            },
            suma: 430,
          },
          převodem: {
            counts: {
              100: 1,
            },
            suma: 100,
          },
        },
      },
    },
  };

  expect(pokladna).toEqual(expected);
});

it('getPokladna - všechny případy', () => {
  const state = JSON.parse(JSON.stringify(ucastniciTestData)); // deep copy
  const { ucastnici } = state.entities;

  ucastnici.byIds['6f09b1fd371dec1e99b7e1c9'].roky = [AKTUALNI_ROK];
  const {
    byIds: {
      '6f09b1fd371dec1e99b7e1c9': { 2016: staraUcast },
    },
  } = ucastnici;
  ucastnici.byIds['6f09b1fd371dec1e99b7e1c9'][AKTUALNI_ROK] = staraUcast;
  ucastnici.byIds['6f09b1fd371dec1e99b7e1c9'][AKTUALNI_ROK].platby = [
    { castka: 300, typ: 'převodem' },
    { castka: 50, typ: 'hotově' },
  ];

  const {
    byIds: {
      '8344bc71dec1e99b7e1d01e': { [AKTUALNI_ROK]: novaPrihlaska },
    },
  } = ucastnici;
  novaPrihlaska.vykon = { kategorie: novaPrihlaska.prihlaska.kategorie, dokonceno: true };

  ucastnici.allIds.push('hohohohohohoho');
  ucastnici.byIds.hohohohohohoho = {
    roky: [AKTUALNI_ROK],
    [AKTUALNI_ROK]: {
      udaje: {},
      prihlaska: {
        kategorie: '5a587e1a051c181132cf83b3',
      },
      vykon: { kategorie: '5a587e1a051c181132cf83b3' },
      platby: [{ castka: 370, typ: 'hotově' }],
    },
  };

  const pokladna = getPokladna({ ...state.entities });
  const expected = {
    total: {
      odstartovano: 6,
      suma: 1500,
      ucastniku: 6,
      zaloha: {
        counts: {
          20: 1,
        },
        suma: 20,
      },
      typy: {
        hotově: {
          counts: {
            0: 1,
            80: 1,
            50: 1,
            350: 1,
            370: 1,
          },
          suma: 850,
        },
        převodem: {
          counts: {
            100: 1,
            250: 1,
            300: 1,
          },
          suma: 650,
        },
      },
    },
    typy: {
      cyklo: {
        odstartovano: 1,
        suma: 370,
        ucastniku: 1,
        typy: {
          hotově: {
            counts: {
              370: 1,
            },
            suma: 370,
          },
        },
        zaloha: {
          counts: {
            20: 1,
          },
          suma: 20,
        },
      },
      maraton: {
        odstartovano: 1,
        suma: 600,
        ucastniku: 2,
        typy: {
          hotově: {
            counts: {
              50: 1,
            },
            suma: 50,
          },
          převodem: {
            counts: {
              250: 1,
              300: 1,
            },
            suma: 550,
          },
        },
      },
      půlmaraton: {
        odstartovano: 4,
        suma: 530,
        ucastniku: 3,
        typy: {
          hotově: {
            counts: {
              0: 1,
              80: 1,
              350: 1,
            },
            suma: 430,
          },
          převodem: {
            counts: {
              100: 1,
            },
            suma: 100,
          },
        },
      },
    },
  };

  expect(pokladna).toEqual(expected);
});
