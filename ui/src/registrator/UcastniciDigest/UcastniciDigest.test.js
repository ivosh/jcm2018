import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import UcastniciDigest from './UcastniciDigest';

const fakeFetchUcastnici = () => {};

it('žádný účastník', () => {
  const wrapper = shallow(
    <UcastniciDigest
      ucastnici={[]}
      fetchUcastnici={fakeFetchUcastnici}
      containerWidth={500}
      containerHeight={500}
    />
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('dva účastníci', () => {
  const ucastnici = [
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

  const wrapper = shallow(
    <UcastniciDigest
      ucastnici={ucastnici}
      fetchUcastnici={fakeFetchUcastnici}
      containerWidth={500}
      containerHeight={500}
    />
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});
