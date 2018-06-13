import React from 'react';
import renderer from 'react-test-renderer';
import Vysledky from './Vysledky';

const vysledky = {
  datum: '9. června 2018',
  subtitle: 'Jirkovský crossmarathon a Jirkovský půlmarathon 2018',
  summary: {
    dokoncilo: 1,
    startovalo: 2
  },
  title: 'Výsledková listina',
  typy: {
    cyklo: {
      popisek: 'cyklisté',
      stats: {
        dokoncilo: 0,
        startovalo: 0
      },
      typ: 'cyklo',
      ucastnici: [],
      zkratky: []
    },
    koloběžka: {
      popisek: 'koloběžky',
      stats: {
        dokoncilo: 0,
        startovalo: 0
      },
      typ: 'koloběžka',
      ucastnici: [],
      zkratky: []
    },
    maraton: {
      popisek: 'maratonci',
      stats: {
        dokoncilo: 0,
        startovalo: 0
      },
      typ: 'maraton',
      ucastnici: [],
      zkratky: []
    },
    pěší: {
      popisek: 'turisté',
      stats: {
        dokoncilo: 0,
        startovalo: 0
      },
      typ: 'pěší',
      ucastnici: [],
      zkratky: []
    },
    půlmaraton: {
      popisek: 'půlmaratonci',
      stats: {
        '1Ž': {
          dokoncilo: 1,
          popisek: 'ženy 18-39',
          startovalo: 1,
          zkratka: '1Ž'
        },
        '4M': {
          dokoncilo: 0,
          popisek: 'muži 60 a více',
          startovalo: 1,
          zkratka: '4M'
        },
        dokoncilo: 1,
        startovalo: 2
      },
      typ: 'půlmaraton',
      ucastnici: [
        {
          absPoradi: 1,
          cas: 'PT2H06M32.6S',
          dokonceno: true,
          id: '7a09b1fd371dec1e99b7e142',
          jmeno: 'Hana',
          kategorie: {
            id: '5a587e1b051c181132cf83d9',
            pohlavi: 'žena',
            typ: 'půlmaraton',
            vek: {
              max: 39,
              min: 18
            },
            zkratka: '1Ž'
          },
          misto: 'SK Nudle',
          narozeni: 1999,
          prijmeni: 'Zralá',
          relPoradi: 1,
          startCislo: 11
        },
        {
          absPoradi: undefined,
          cas: undefined,
          dokonceno: false,
          id: '5a09b1fd371dec1e99b7e1c9',
          jmeno: 'Roman',
          kategorie: {
            id: '5a587e1b051c181132cf83d7',
            pohlavi: 'muž',
            typ: 'půlmaraton',
            vek: {
              max: 150,
              min: 60
            },
            zkratka: '4M'
          },
          misto: 'Ostrava 2',
          narozeni: 1956,
          prijmeni: 'Balabák',
          relPoradi: undefined,
          startCislo: 15
        }
      ],
      zkratky: ['4M', '1Ž']
    }
  }
};

it('renders', () => {
  const component = renderer.create(<Vysledky vysledky={vysledky} />);
  expect(component.toJSON()).toMatchSnapshot();
});
