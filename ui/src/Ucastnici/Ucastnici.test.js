import React from 'react';
import renderer from 'react-test-renderer';
import Ucastnici from './Ucastnici';

const fakeFetchUcastnici = () => {};

it('žádný účastník', () => {
  const component = renderer.create(
    <Ucastnici ucastnici={[]} fetchUcastnici={fakeFetchUcastnici} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('dva účastníci', () => {
  const ucastnici = [
    { id: '5a09b1fd371dec1e99b7e1c9', prijmeni: 'Balabák', jmeno: 'Roman', narozeni: 1956 },
    { id: '6f09b1fd371dec1e99b7e1c9', prijmeni: 'Sukdoláková', jmeno: 'Martina', narozeni: 1963 }
  ];

  const component = renderer.create(
    <Ucastnici ucastnici={ucastnici} fetchUcastnici={fakeFetchUcastnici} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});
