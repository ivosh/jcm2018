import deepFreeze from 'deep-freeze';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import { getPokladna } from './pokladnaReducer';

it('getPokladna() - ucastniciTestData', () => {
  const state = ucastniciTestData;
  deepFreeze(state);
  const pokladna = getPokladna({ ...state.entities });
  const expected = {
    total: {
      suma: 430,
      ucastniku: 2,
      typy: {
        hotově: {
          counts: {
            80: 1,
            250: 1
          },
          suma: 330
        },
        převodem: {
          counts: {
            100: 1
          },
          suma: 100
        }
      }
    },
    typy: {
      půlmaraton: {
        suma: 430,
        ucastniku: 2,
        typy: {
          hotově: {
            counts: {
              80: 1,
              250: 1
            },
            suma: 330
          },
          převodem: {
            counts: {
              100: 1
            },
            suma: 100
          }
        }
      }
    }
  };

  expect(pokladna).toEqual(expected);
});

it('getPokladna - all cases', () => {
  const state = JSON.parse(JSON.stringify(ucastniciTestData)); // deep copy
  const { ucastnici } = state.entities;

  ucastnici.byIds['6f09b1fd371dec1e99b7e1c9'].roky = [2018];
  const {
    byIds: {
      '6f09b1fd371dec1e99b7e1c9': { 2016: staraUcast }
    }
  } = ucastnici;
  ucastnici.byIds['6f09b1fd371dec1e99b7e1c9'][2018] = staraUcast;
  ucastnici.byIds['6f09b1fd371dec1e99b7e1c9'][2018].platby = [
    { castka: 200, typ: 'převodem' },
    { castka: 50, typ: 'hotově' }
  ];

  const {
    byIds: {
      '8344bc71dec1e99b7e1d01e': { 2018: novaPrihlaska }
    }
  } = ucastnici;
  novaPrihlaska.vykon = { kategorie: novaPrihlaska.prihlaska.kategorie, dokonceno: true };

  ucastnici.allIds.push('hohohohohohoho');
  ucastnici.byIds.hohohohohohoho = {
    roky: [2018],
    2018: {
      udaje: {},
      prihlaska: {
        kategorie: '5a587e1a051c181132cf83b3'
      },
      vykon: { kategorie: '5a587e1a051c181132cf83b3' },
      platby: [{ castka: 270, typ: 'hotově' }]
    }
  };

  const pokladna = getPokladna({ ...state.entities });
  const expected = {
    total: {
      suma: 950,
      ucastniku: 5,
      zaloha: {
        counts: {
          20: 1
        },
        suma: 20
      },
      typy: {
        hotově: {
          counts: {
            0: 1,
            80: 1,
            50: 1,
            250: 1,
            270: 1
          },
          suma: 650
        },
        převodem: {
          counts: {
            100: 1,
            200: 1
          },
          suma: 300
        }
      }
    },
    typy: {
      cyklo: {
        suma: 270,
        ucastniku: 1,
        typy: {
          hotově: {
            counts: {
              270: 1
            },
            suma: 270
          }
        },
        zaloha: {
          counts: {
            20: 1
          },
          suma: 20
        }
      },
      maraton: {
        suma: 250,
        ucastniku: 1,
        typy: {
          hotově: {
            counts: {
              50: 1
            },
            suma: 50
          },
          převodem: {
            counts: {
              200: 1
            },
            suma: 200
          }
        }
      },
      půlmaraton: {
        suma: 430,
        ucastniku: 3,
        typy: {
          hotově: {
            counts: {
              0: 1,
              80: 1,
              250: 1
            },
            suma: 330
          },
          převodem: {
            counts: {
              100: 1
            },
            suma: 100
          }
        }
      }
    }
  };

  expect(pokladna).toEqual(expected);
});
