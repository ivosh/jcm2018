import deepFreeze from 'deep-freeze';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import { kategorieFilterChange, kategorieSubFilterChange } from './VitezoveActions';
import vitezoveReducer, { getVitezove } from './vitezoveReducer';

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = vitezoveReducer(stateBefore, {});
  expect(stateAfter.kategorieFilter).toEqual('');
  expect(stateAfter.kategorieSubFilter).toEqual('');
});

it('přepínání kategorieSubFilter', () => {
  const stateBefore = { kategorieFilter: 'maraton' };
  const stateAfter = { ...stateBefore, kategorieSubFilter: '5a587e1a051c181132cf83ba' };
  deepFreeze(stateBefore);

  expect(
    vitezoveReducer(stateBefore, kategorieSubFilterChange('5a587e1a051c181132cf83ba'))
  ).toEqual(stateAfter);
});

it('přepínání kategorieSubFilter - vypnout', () => {
  const stateBefore = {
    kategorieFilter: 'maraton',
    kategorieSubFilter: '5a587e1a051c181132cf83ba'
  };
  const stateAfter = { ...stateBefore, kategorieSubFilter: '' };
  deepFreeze(stateBefore);

  expect(
    vitezoveReducer(stateBefore, kategorieSubFilterChange('5a587e1a051c181132cf83ba'))
  ).toEqual(stateAfter);
});

it('přepínání kategorieFilter - vypnout', () => {
  const stateBefore = {
    kategorieFilter: 'maraton',
    kategorieSubFilter: '5a587e1a051c181132cf83ba'
  };
  const stateAfter = { kategorieFilter: '', kategorieSubFilter: '' };
  deepFreeze(stateBefore);

  expect(vitezoveReducer(stateBefore, kategorieFilterChange(''))).toEqual(stateAfter);
});

it('přepínání kategorieFilter - přepnout', () => {
  const stateBefore = {
    kategorieFilter: 'maraton',
    kategorieSubFilter: '5a587e1a051c181132cf83ba'
  };
  const stateAfter = { kategorieFilter: 'cyklo', kategorieSubFilter: '' };
  deepFreeze(stateBefore);

  expect(vitezoveReducer(stateBefore, kategorieFilterChange('cyklo'))).toEqual(stateAfter);
});

it('getVitezove() - kategorie nevybrána', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      vitezove: {
        kategorieFilter: '',
        kategorieSubFilter: ''
      }
    }
  };
  deepFreeze(state);

  const {
    entities,
    registrator: { vitezove: props }
  } = state;
  expect(getVitezove({ ...entities, ...props })).toEqual([]);
});

it('getVitezove() - for kategorie půlmaraton/žena/18-39', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      vitezove: {
        kategorieFilter: 'půlmaraton',
        kategorieSubFilter: '5a587e1b051c181132cf83d9'
      }
    }
  };
  const selected = [
    {
      id: '7a09b1fd371dec1e99b7e142',
      prijmeni: 'Zralá',
      jmeno: 'Hana',
      narozeni: { den: 25, mesic: 7, rok: 1999 },
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 },
        zkratka: '1Ž'
      },
      startCislo: 11,
      dokonceno: true,
      cas: 'PT2H06M32.6S',
      absPoradi: 1,
      relPoradi: 1
    },
    {
      id: '9ccbc71dedc1e99b7e1d671',
      prijmeni: 'Půlmaratonka',
      jmeno: 'Božena',
      narozeni: { den: 25, mesic: 7, rok: 2001 },
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 },
        zkratka: '1Ž'
      },
      startCislo: 8,
      dokonceno: true,
      cas: 'PT3H15M32.6S',
      absPoradi: 2,
      relPoradi: 2
    }
  ];
  deepFreeze(state);

  const {
    entities,
    registrator: { vitezove: props }
  } = state;
  expect(getVitezove({ ...entities, ...props })).toEqual(selected);
});
