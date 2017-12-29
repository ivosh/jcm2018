import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import UcastniciDigestTable from './UcastniciDigestTable';

const roky = [
  2001,
  2002,
  2003,
  2004,
  2005,
  2006,
  2007,
  2008,
  2009,
  2010,
  2011,
  2012,
  2013,
  2014,
  2015,
  2016,
  2017,
  2018
];

it('žádný účastník', () => {
  const wrapper = shallow(
    <UcastniciDigestTable
      roky={roky}
      ucastniciDigest={[]}
      fetchUcastnici={jest.fn()}
      onSortDirChange={jest.fn()}
      containerWidth={500}
      containerHeight={500}
    />
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('dva účastníci', () => {
  const ucastniciDigest = [
    {
      id: '5a09b1fd371dec1e99b7e1c9',
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: '1956',
      2016: { dokonceno: false },
      2017: { dokonceno: true, kategorie: 'maraton' },
      2018: { dokonceno: true, kategorie: 'půlmaraton' }
    },
    {
      id: '6f09b1fd371dec1e99b7e1c9',
      prijmeni: 'Sukdoláková',
      jmeno: 'Martina',
      narozeni: '7. 12. 1963',
      2015: { dokonceno: false },
      2017: { dokonceno: true, kategorie: 'maraton' },
      2018: { dokonceno: undefined, kategorie: 'půlmaraton' }
    }
  ];

  const wrapper = shallow(
    <UcastniciDigestTable
      roky={roky}
      ucastniciDigest={ucastniciDigest}
      fetchUcastnici={jest.fn()}
      onSortDirChange={jest.fn()}
      containerWidth={500}
      containerHeight={500}
    />
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});
