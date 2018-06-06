import deepFreeze from 'deep-freeze';
import { TYPY_KATEGORII } from '../../constants';
import { signOutSuccess } from '../../auth/SignOut/SignOutActions';
import { fetchRocnikySuccess } from './rocnikyActions';
import rocnikyReducer, { getDatumKonani, getKategorie, getKategorieProTyp } from './rocnikyReducer';

it('nic se nestalo 1', () => {
  const stateBefore = undefined;

  const stateAfter = rocnikyReducer(stateBefore, {});
  expect(stateAfter).toEqual({ byRoky: {}, roky: [] });
});

it('nic se nestalo 2', () => {
  const stateBefore = { byRoky: { 2017: { datum: '2017-06-10' } }, roky: [2017] };
  const stateAfter = { ...stateBefore };
  deepFreeze(stateBefore);

  expect(rocnikyReducer(stateBefore, {})).toEqual(stateAfter);
});

it('po načtení ročníků', () => {
  const json = {
    code: 'ok',
    response: {
      kategorie: {
        '5a71b1fd45754c1e99b7e1bc': {
          id: '5a71b1fd45754c1e99b7e1bc',
          pohlavi: 'žena',
          typ: 'maraton',
          vek: {
            max: 49,
            min: 40
          }
        },
        '5a09b1fd371dec1e99b7e1c9': {
          id: '5a09b1fd371dec1e99b7e1c9',
          pohlavi: 'žena',
          typ: 'maraton',
          vek: {
            max: 59,
            min: 50
          }
        },
        '5a71b1fd371dec1e99b7e1bc': {
          id: '5a71b1fd371dec1e99b7e1bc',
          typ: 'pěší'
        },
        '8799b1fd371dec1e99b7e1c9': {
          id: '8799b1fd371dec1e99b7e1c9',
          pohlavi: 'muž',
          typ: 'půlmaraton',
          vek: {
            max: 59,
            min: 50
          }
        },
        '1609b1fd3748746e99b7e1c9': {
          id: '1609b1fd3748746e99b7e1c9',
          pohlavi: 'žena',
          typ: 'půlmaraton',
          vek: {
            max: 49,
            min: 40
          }
        },
        '3279b1fd371dec1e99b7e1c9': {
          id: '3279b1fd371dec1e99b7e1c9',
          pohlavi: 'žena',
          typ: 'půlmaraton',
          vek: {
            max: 59,
            min: 50
          }
        }
      },
      rocniky: {
        2017: {
          datum: '2017-06-10',
          id: '6f09b1fd371dec1e99b7e1c9',
          kategorie: {
            maraton: {
              startCisla: '1-100',
              startovne: {
                naMiste: 200,
                predem: 150
              },
              žena: [
                {
                  id: '5a71b1fd45754c1e99b7e1bc',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: {
                    max: 49,
                    min: 40
                  }
                },
                {
                  id: '5a09b1fd371dec1e99b7e1c9',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: {
                    max: 59,
                    min: 50
                  }
                }
              ]
            }
          },
          ubytovani: {
            pátek: { poplatek: 50 },
            sobota: { poplatek: 60 }
          }
        },
        2018: {
          datum: '2018-06-09T00:00:00.000Z',
          id: '5a71b1fd371dec1e99b7e1bc',
          kategorie: {
            maraton: {
              startCisla: '5-95',
              startovne: {
                naMiste: 250,
                predem: 200
              },
              žena: [
                {
                  id: '5a71b1fd45754c1e99b7e1bc',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: {
                    max: 49,
                    min: 40
                  }
                },
                {
                  id: '5a09b1fd371dec1e99b7e1c9',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: {
                    max: 59,
                    min: 50
                  }
                }
              ]
            },
            pěší: {
              id: '5a71b1fd371dec1e99b7e1bc',
              startovne: {
                naMiste: 25,
                predem: 25
              },
              typ: 'pěší'
            },
            půlmaraton: {
              muž: [
                {
                  id: '8799b1fd371dec1e99b7e1c9',
                  pohlavi: 'muž',
                  typ: 'půlmaraton',
                  vek: {
                    max: 59,
                    min: 50
                  }
                }
              ],
              startCisla: '100-199',
              startovne: {
                naMiste: 250,
                predem: 200
              },
              žena: [
                {
                  id: '1609b1fd3748746e99b7e1c9',
                  pohlavi: 'žena',
                  typ: 'půlmaraton',
                  vek: {
                    max: 49,
                    min: 40
                  }
                },
                {
                  id: '3279b1fd371dec1e99b7e1c9',
                  pohlavi: 'žena',
                  typ: 'půlmaraton',
                  vek: {
                    max: 59,
                    min: 50
                  }
                }
              ]
            }
          },
          ubytovani: {
            pátek: { poplatek: 60 }
          }
        }
      }
    },
    requestId: '0.9310306652587377'
  };

  const stateBefore = { byRoky: {}, roky: [] };
  const stateAfter = { byRoky: { ...json.response.rocniky }, roky: [2017, 2018] };
  deepFreeze(stateBefore);
  const action = fetchRocnikySuccess(json);

  expect(rocnikyReducer(stateBefore, action)).toEqual(stateAfter);
  expect(action.getDatumKonani()).toEqual(new Date('2018-06-09').toJSON());
  expect(getDatumKonani({ rocniky: stateAfter })).toEqual(new Date('2018-06-09').toJSON());
});

it('po odhlášení', () => {
  const stateBefore = {
    byRoky: {
      2017: {
        datum: '2017-06-10',
        id: '6f09b1fd371dec1e99b7e1c9',
        kategorie: {
          maraton: {
            startCisla: '1-100',
            startovne: {
              naMiste: 200,
              predem: 150
            },
            žena: [
              {
                id: '5a71b1fd45754c1e99b7e1bc',
                pohlavi: 'žena',
                typ: 'maraton',
                vek: {
                  max: 49,
                  min: 40
                }
              },
              {
                id: '5a09b1fd371dec1e99b7e1c9',
                pohlavi: 'žena',
                typ: 'maraton',
                vek: {
                  max: 59,
                  min: 50
                }
              }
            ]
          }
        },
        ubytovani: {
          pátek: { poplatek: 50 },
          sobota: { poplatek: 60 }
        }
      }
    },
    roky: [2017]
  };
  const stateAfter = { byRoky: {}, roky: [] };
  deepFreeze(stateBefore);

  expect(rocnikyReducer(stateBefore, signOutSuccess())).toEqual(stateAfter);
});

it('getKategorie(), getKategorieProTyp()', () => {
  const rocniky = {
    roky: [2018],
    byRoky: {
      2018: {
        id: '5a587e1b051c181132cf83df',
        kategorie: {
          maraton: {
            muž: [
              {
                id: '5a587e1a051c181132cf83b8',
                pohlavi: 'muž',
                typ: 'maraton',
                vek: { min: 18, max: 39 }
              },
              {
                id: '5a587e1a051c181132cf83ba',
                pohlavi: 'muž',
                typ: 'maraton',
                vek: { min: 40, max: 49 }
              },
              {
                id: '5a587e1a051c181132cf83bc',
                pohlavi: 'muž',
                typ: 'maraton',
                vek: { min: 50, max: 59 }
              },
              {
                id: '5a587e1b051c181132cf83d6',
                pohlavi: 'muž',
                typ: 'maraton',
                vek: { min: 60, max: 69 }
              },
              {
                id: '5a587e1b051c181132cf83d8',
                pohlavi: 'muž',
                typ: 'maraton',
                vek: { min: 70, max: 150 }
              }
            ],
            žena: [
              {
                id: '5a587e1a051c181132cf83c0',
                pohlavi: 'žena',
                typ: 'maraton',
                vek: { min: 18, max: 39 }
              },
              {
                id: '5a587e1a051c181132cf83c1',
                pohlavi: 'žena',
                typ: 'maraton',
                vek: { min: 40, max: 49 }
              },
              {
                id: '5a587e1a051c181132cf83c2',
                pohlavi: 'žena',
                typ: 'maraton',
                vek: { min: 50, max: 59 }
              },
              {
                id: '5a587e1b051c181132cf83dc',
                pohlavi: 'žena',
                typ: 'maraton',
                vek: { min: 60, max: 69 }
              },
              {
                id: '5a587e1b051c181132cf83de',
                pohlavi: 'žena',
                typ: 'maraton',
                vek: { min: 70, max: 150 }
              }
            ],
            startovne: { predem: 200, naMiste: 250 },
            startCisla: { barva: 'cervena', rozsahy: ['1-100'] }
          },
          půlmaraton: {
            muž: [
              {
                id: '5a587e1b051c181132cf83d3',
                pohlavi: 'muž',
                typ: 'půlmaraton',
                vek: { min: 18, max: 39 }
              },
              {
                id: '5a587e1b051c181132cf83d4',
                pohlavi: 'muž',
                typ: 'půlmaraton',
                vek: { min: 40, max: 49 }
              },
              {
                id: '5a587e1b051c181132cf83d5',
                pohlavi: 'muž',
                typ: 'půlmaraton',
                vek: { min: 50, max: 59 }
              },
              {
                id: '5a587e1b051c181132cf83d7',
                pohlavi: 'muž',
                typ: 'půlmaraton',
                vek: { min: 60, max: 150 }
              }
            ],
            žena: [
              {
                id: '5a587e1b051c181132cf83d9',
                pohlavi: 'žena',
                typ: 'půlmaraton',
                vek: { min: 18, max: 39 }
              },
              {
                id: '5a587e1b051c181132cf83da',
                pohlavi: 'žena',
                typ: 'půlmaraton',
                vek: { min: 40, max: 49 }
              },
              {
                id: '5a587e1b051c181132cf83db',
                pohlavi: 'žena',
                typ: 'půlmaraton',
                vek: { min: 50, max: 59 }
              },
              {
                id: '5a587e1b051c181132cf83dd',
                pohlavi: 'žena',
                typ: 'půlmaraton',
                vek: { min: 60, max: 150 }
              }
            ],
            startovne: { predem: 200, naMiste: 250 },
            startCisla: { barva: 'cerna', rozsahy: ['1-100'] }
          },
          cyklo: {
            id: '5a587e1b051c181132cf83c8',
            typ: 'cyklo',
            vek: { min: 16, max: 17, presne: true },
            muž: [
              {
                id: '5a587e1a051c181132cf83b3',
                pohlavi: 'muž',
                typ: 'cyklo',
                vek: { min: 18, max: 35 }
              },
              {
                id: '5a587e1a051c181132cf83b9',
                pohlavi: 'muž',
                typ: 'cyklo',
                vek: { min: 36, max: 45 }
              },
              {
                id: '5a587e1a051c181132cf83bb',
                pohlavi: 'muž',
                typ: 'cyklo',
                vek: { min: 46, max: 150 }
              }
            ],
            žena: [
              {
                id: '5a587e1a051c181132cf83b5',
                pohlavi: 'žena',
                typ: 'cyklo',
                vek: { min: 18, max: 35 }
              },
              {
                id: '5a587e1a051c181132cf83bd',
                pohlavi: 'žena',
                typ: 'cyklo',
                vek: { min: 36, max: 45 }
              },
              {
                id: '5a587e1a051c181132cf83bf',
                pohlavi: 'žena',
                typ: 'cyklo',
                vek: { min: 46, max: 150 }
              }
            ],
            startovne: { predem: 200, naMiste: 250, zaloha: 20 },
            startCisla: { rozsahy: ['1-150'] }
          },
          koloběžka: {
            muž: [
              {
                id: '5a587e1b051c181132cf83cf',
                pohlavi: 'muž',
                typ: 'koloběžka',
                vek: { min: 18, max: 150 }
              }
            ],
            žena: [
              {
                id: '5a587e1b051c181132cf83d0',
                pohlavi: 'žena',
                typ: 'koloběžka',
                vek: { min: 18, max: 150 }
              }
            ],
            startovne: { predem: 200, naMiste: 250 },
            startCisla: { rozsahy: ['100-90'] }
          },
          pěší: {
            id: '5a587e1a051c181132cf83b1',
            typ: 'pěší',
            startovne: { predem: 30, naMiste: 30 }
          }
        },
        datum: '2018-06-09T00:00:00.000Z',
        ubytovani: { pátek: { poplatek: 50 } }
      }
    }
  };

  TYPY_KATEGORII.forEach(typ => expect(getKategorieProTyp({ typ, rocniky })).toMatchSnapshot());
  expect(getKategorie({ rocniky })).toMatchSnapshot();
});
