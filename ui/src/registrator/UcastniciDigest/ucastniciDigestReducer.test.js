import deepFreeze from 'deep-freeze';
import ucastniciDigestReducer, {
  SortDirTypes,
  getUcastniciDigestSorted
} from './ucastniciDigestReducer';
import {
  kategorieVykonuFilterChange,
  textFilterChange,
  sortDirChange
} from './UcastniciDigestActions';

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = ucastniciDigestReducer(stateBefore, {});
  expect(stateAfter.isFetching).toEqual(false);
  expect(stateAfter.kategorieVykonuFilter).toEqual('');
  expect(stateAfter.textFilter).toEqual('');
  expect(stateAfter.sortColumn).toBe(undefined);
  expect(stateAfter.sortDir).toEqual(SortDirTypes.NONE);
});

it('řadit dle příjmení vzestupně', () => {
  const stateBefore = {
    sortColumn: undefined,
    sortDir: SortDirTypes.NONE,
    kategorieVykonuFilter: '',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, sortColumn: 'prijmeni', sortDir: SortDirTypes.ASC };
  deepFreeze(stateBefore);

  expect(ucastniciDigestReducer(stateBefore, sortDirChange('prijmeni'))).toEqual(stateAfter);
});

it('řadit dle příjmení sestupně', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieVykonuFilter: '',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, sortColumn: 'prijmeni', sortDir: SortDirTypes.DESC };
  deepFreeze(stateBefore);

  expect(ucastniciDigestReducer(stateBefore, sortDirChange('prijmeni'))).toEqual(stateAfter);
});

it('řadit dle jména vzestupně', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieVykonuFilter: '',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, sortColumn: 'jmeno', sortDir: SortDirTypes.ASC };
  deepFreeze(stateBefore);

  expect(ucastniciDigestReducer(stateBefore, sortDirChange('jmeno'))).toEqual(stateAfter);
});

it('zapnout filtrování podle kategorie výkonu', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieVykonuFilter: '',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, kategorieVykonuFilter: 'půlmaraton' };
  deepFreeze(stateBefore);

  expect(ucastniciDigestReducer(stateBefore, kategorieVykonuFilterChange('půlmaraton'))).toEqual(
    stateAfter
  );
});

it('vypnout filtrování podle kategorie výkonu', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieVykonuFilter: 'půlmaraton',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, kategorieVykonuFilter: '' };
  deepFreeze(stateBefore);

  expect(ucastniciDigestReducer(stateBefore, kategorieVykonuFilterChange('půlmaraton'))).toEqual(
    stateAfter
  );
});

it('přeppnout filtrování podle kategorie výkonu', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieVykonuFilter: 'půlmaraton',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, kategorieVykonuFilter: 'pěší' };
  deepFreeze(stateBefore);

  expect(ucastniciDigestReducer(stateBefore, kategorieVykonuFilterChange('pěší'))).toEqual(
    stateAfter
  );
});

it('filtrovat na dvě písmena', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieVykonuFilter: '',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, textFilter: 'kl' };
  deepFreeze(stateBefore);

  expect(ucastniciDigestReducer(stateBefore, textFilterChange('Kl'))).toEqual(stateAfter);
});

it('přepínání isFetching', () => {
  const stateBefore = {
    isFetching: false,
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieVykonuFilter: '',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, isFetching: true };
  deepFreeze(stateBefore);

  expect(ucastniciDigestReducer(stateBefore, { type: 'FETCH_UCASTNICI_REQUEST' })).toEqual(
    stateAfter
  );
  expect(ucastniciDigestReducer(stateAfter, { type: 'FETCH_UCASTNICI_SUCCESS' })).toEqual(
    stateBefore
  );
  expect(ucastniciDigestReducer(stateAfter, { type: 'FETCH_UCASTNICI_ERROR' })).toEqual(
    stateBefore
  );
});

it('getUcastniciDigestSorted() by default', () => {
  const state = {
    entities: {
      ucastnici: {
        allIds: ['6f09b1fd371dec1e99b7e1c9', '5a09b1fd371dec1e99b7e1c9'],
        byIds: {
          '6f09b1fd371dec1e99b7e1c9': {
            roky: [2016],
            2016: {
              udaje: {
                prijmeni: 'Sukdoláková',
                jmeno: 'Martina',
                narozeni: { rok: 1963, mesic: 12, den: 7 },
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
      }
    },
    registrator: {
      ucastniciDigest: {
        sortColumn: undefined,
        sortDir: undefined,
        kategorieVykonuFilter: '',
        textFilter: ''
      }
    }
  };
  const selected = [
    {
      id: '5a09b1fd371dec1e99b7e1c9',
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: '1956'
    },
    {
      id: '6f09b1fd371dec1e99b7e1c9',
      prijmeni: 'Sukdoláková',
      jmeno: 'Martina',
      narozeni: '7. 12. 1963'
    }
  ];
  deepFreeze(state);

  const { entities, registrator } = state;
  expect(getUcastniciDigestSorted({ ...entities, ...registrator.ucastniciDigest })).toEqual(
    selected
  );
});

it('getUcastniciDigestSorted() podle příjmení sestupně', () => {
  const state = {
    entities: {
      ucastnici: {
        allIds: ['6f09b1fd371dec1e99b7e1c9', '5a09b1fd371dec1e99b7e1c9'],
        byIds: {
          '6f09b1fd371dec1e99b7e1c9': {
            roky: [2016],
            2016: {
              udaje: {
                prijmeni: 'Sukdoláková',
                jmeno: 'Martina',
                narozeni: { rok: 1963, mesic: 12, den: 7 },
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
      }
    },
    registrator: {
      ucastniciDigest: {
        sortColumn: 'prijmeni',
        sortDir: SortDirTypes.DESC,
        kategorieVykonuFilter: '',
        textFilter: ''
      }
    }
  };
  const selected = [
    {
      id: '6f09b1fd371dec1e99b7e1c9',
      prijmeni: 'Sukdoláková',
      jmeno: 'Martina',
      narozeni: '7. 12. 1963'
    },
    {
      id: '5a09b1fd371dec1e99b7e1c9',
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: '1956'
    }
  ];
  deepFreeze(state);

  const { entities, registrator } = state;
  expect(getUcastniciDigestSorted({ ...entities, ...registrator.ucastniciDigest })).toEqual(
    selected
  );
});

it('getUcastniciDigestSorted() podle narození sestupně', () => {
  const state = {
    entities: {
      ucastnici: {
        allIds: ['6f09b1fd371dec1e99b7e1c9', '5a09b1fd371dec1e99b7e1c9'],
        byIds: {
          '6f09b1fd371dec1e99b7e1c9': {
            roky: [2016],
            2016: {
              udaje: {
                prijmeni: 'Sukdoláková',
                jmeno: 'Martina',
                narozeni: { rok: 1963, mesic: 12, den: 7 },
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
      }
    },
    registrator: {
      ucastniciDigest: {
        sortColumn: 'narozeni',
        sortDir: SortDirTypes.DESC,
        kategorieVykonuFilter: '',
        textFilter: ''
      }
    }
  };
  const selected = [
    {
      id: '6f09b1fd371dec1e99b7e1c9',
      prijmeni: 'Sukdoláková',
      jmeno: 'Martina',
      narozeni: '7. 12. 1963'
    },
    {
      id: '5a09b1fd371dec1e99b7e1c9',
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: '1956'
    }
  ];
  deepFreeze(state);

  const { entities, registrator } = state;
  expect(getUcastniciDigestSorted({ ...entities, ...registrator.ucastniciDigest })).toEqual(
    selected
  );
});

it('getUcastniciDigestSorted() filtrováno na r', () => {
  const state = {
    entities: {
      ucastnici: {
        allIds: ['6f09b1fd371dec1e99b7e1c9', '5a09b1fd371dec1e99b7e1c9'],
        byIds: {
          '6f09b1fd371dec1e99b7e1c9': {
            roky: [2016],
            2016: {
              udaje: {
                prijmeni: 'Sukdoláková',
                jmeno: 'Martina',
                narozeni: { rok: 1963, mesic: 12, den: 7 },
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
      }
    },
    registrator: {
      ucastniciDigest: {
        sortColumn: undefined,
        sortDir: undefined,
        kategorieVykonuFilter: '',
        textFilter: 'r'
      }
    }
  };
  const selected = [
    {
      id: '5a09b1fd371dec1e99b7e1c9',
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: '1956'
    }
  ];
  deepFreeze(state);

  const { entities, registrator } = state;
  expect(getUcastniciDigestSorted({ ...entities, ...registrator.ucastniciDigest })).toEqual(
    selected
  );
});

it('getUcastniciDigestSorted() filtrováno na kategorii výkonu půlmaraton', () => {
  const state = {
    entities: {
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
        '6439b1fd371dec1e99b7e1c9': {
          id: '6439b1fd371dec1e99b7e1c9',
          pohlavi: 'muž',
          typ: 'maraton',
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
      ucastnici: {
        allIds: ['6f09b1fd371dec1e99b7e1c9', '5a09b1fd371dec1e99b7e1c9'],
        byIds: {
          '6f09b1fd371dec1e99b7e1c9': {
            roky: [2016],
            2016: {
              udaje: {
                prijmeni: 'Sukdoláková',
                jmeno: 'Martina',
                narozeni: { rok: 1963, mesic: 12, den: 7 },
                pohlavi: 'zena',
                obec: 'Zlín',
                stat: 'Česká republika'
              },
              vykon: {
                kategorie: '5a71b1fd45754c1e99b7e1bc',
                startCislo: 11,
                dokonceno: true,
                cas: 'PT3H42M32.6S'
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
              },
              vykon: {
                kategorie: '8799b1fd371dec1e99b7e1c9',
                startCislo: 15,
                dokonceno: false
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
              },
              vykon: {
                kategorie: '6439b1fd371dec1e99b7e1c9',
                startCislo: 34,
                dokonceno: true,
                cas: 'PT1H25M32.6S'
              }
            }
          }
        }
      }
    },
    registrator: {
      ucastniciDigest: {
        sortColumn: undefined,
        sortDir: undefined,
        kategorieVykonuFilter: 'půlmaraton',
        textFilter: ''
      }
    }
  };
  const selected = [
    {
      id: '5a09b1fd371dec1e99b7e1c9',
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: '1956',
      2017: { dokonceno: true, kategorie: 'maraton' },
      2018: { dokonceno: false, kategorie: 'půlmaraton' }
    }
  ];
  deepFreeze(state);

  const { entities, registrator } = state;
  expect(getUcastniciDigestSorted({ ...entities, ...registrator.ucastniciDigest })).toEqual(
    selected
  );
});
