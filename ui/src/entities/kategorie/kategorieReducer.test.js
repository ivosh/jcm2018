import deepFreeze from 'deep-freeze';
import { signOutSuccess } from '../../auth/SignOut/SignOutActions';
import kategorieReducer from './kategorieReducer';
import { fetchKategorieSuccess } from './kategorieActions';

it('nic se nestalo 1', () => {
  const stateBefore = undefined;

  const stateAfter = kategorieReducer(stateBefore, {});
  expect(stateAfter).toEqual({});
});

it('nic se nestalo 2', () => {
  const stateBefore = { '5a71b1fd371dec1e99b7e1bc': { typ: 'pěší' } };
  const stateAfter = { ...stateBefore };
  deepFreeze(stateBefore);

  expect(kategorieReducer(stateBefore, {})).toEqual(stateAfter);
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
            pátek: 50,
            sobota: 60
          }
        },
        2018: {
          datum: '2018-06-08T00:00:00.000Z',
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
            pátek: 60
          }
        }
      }
    },
    requestId: '0.9310306652587377'
  };

  const stateBefore = {};
  const stateAfter = { ...json.response.kategorie };
  deepFreeze(stateBefore);

  expect(kategorieReducer(stateBefore, fetchKategorieSuccess(json))).toEqual(stateAfter);
});

it('po odhlášení', () => {
  const stateBefore = {
    '5a71b1fd45754c1e99b7e1bc': {
      id: '5a71b1fd45754c1e99b7e1bc',
      pohlavi: 'žena',
      typ: 'maraton',
      vek: {
        max: 49,
        min: 40
      }
    }
  };
  const stateAfter = {};
  deepFreeze(stateBefore);

  expect(kategorieReducer(stateBefore, signOutSuccess())).toEqual(stateAfter);
});
