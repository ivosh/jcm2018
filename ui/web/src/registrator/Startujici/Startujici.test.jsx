import React from 'react';
import renderer from 'react-test-renderer';
import { wrapInDnDTestContext } from '../../testing';
import Startujici from './Startujici';

const prihlaseni = [
  {
    id: '5a09b1fd371dec1e99b7e1c9',
    prijmeni: 'Balabák',
    jmeno: 'Roman',
    narozeni: { rok: 1956 },
    kategorie: {
      id: '5a587e1b051c181132cf83d7',
      pohlavi: 'muž',
      typ: 'půlmaraton',
      vek: { min: 60, max: 150 },
    },
    startCislo: 17,
    startCisloRequired: true,
  },
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
    },
    startCislo: 10,
    startCisloRequired: true,
  },
];

const odstartovani = [
  {
    id: '5a09b1fd371dec1e99b7e1c9',
    prijmeni: 'Balabák',
    jmeno: 'Roman',
    narozeni: { rok: 1956 },
    kategorie: {
      id: '5a587e1b051c181132cf83d7',
      pohlavi: 'muž',
      typ: 'půlmaraton',
      vek: { min: 60, max: 150 },
    },
    startCislo: 15,
    startCisloRequired: true,
  },
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
    },
    startCislo: 11,
    startCisloRequired: true,
  },
];

// Render with the test context that uses the test backend.
const StartujiciDnD = wrapInDnDTestContext(Startujici);

it('žádný přihlášený', () => {
  const component = renderer.create(
    <StartujiciDnD
      prihlaseni={[]}
      odstartovani={[]}
      movePrihlasen={jest.fn()}
      moveOdstartovan={jest.fn()}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('žádný odstartovaný', () => {
  const component = renderer.create(
    <StartujiciDnD
      prihlaseni={prihlaseni}
      odstartovani={[]}
      movePrihlasen={jest.fn()}
      moveOdstartovan={jest.fn()}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('dva odstartovaní', () => {
  const component = renderer.create(
    <StartujiciDnD
      prihlaseni={prihlaseni}
      odstartovani={odstartovani}
      movePrihlasen={jest.fn()}
      moveOdstartovan={jest.fn()}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
});
