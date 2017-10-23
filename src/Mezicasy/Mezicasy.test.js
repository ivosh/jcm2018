import React from 'react';
import renderer from 'react-test-renderer';
import moment from 'moment';
import Mezicasy from './Mezicasy';

const fakeOnRemoveMezicas = () => {};

it('žádný mezičas', () => {
  const component = renderer.create(
    <Mezicasy mezicasy={[]} onRemoveMezicas={fakeOnRemoveMezicas} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('jeden mezičas', () => {
  const mezicasy = [{ id: 0, duration: moment.duration(234) }];
  const component = renderer.create(
    <Mezicasy mezicasy={mezicasy} onRemoveMezicas={fakeOnRemoveMezicas} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('tři mezičasy', () => {
  const mezicasy = [
    { id: 0, duration: moment.duration(234) },
    { id: 1, duration: moment.duration(567) },
    { id: 2, duration: moment.duration(9024) }
  ];
  const component = renderer.create(
    <Mezicasy mezicasy={mezicasy} onRemoveMezicas={fakeOnRemoveMezicas} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});
