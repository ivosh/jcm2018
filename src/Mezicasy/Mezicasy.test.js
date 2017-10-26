import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import moment from 'moment';
import Mezicasy from './Mezicasy';

const fakeOnRemove = () => {};
const FakeCislo = props => <span>{props.cislo}</span>;

it('žádný mezičas', () => {
  const component = renderer.create(<Mezicasy mezicasy={[]} cisloClass={FakeCislo} />);
  expect(component.toJSON()).toMatchSnapshot();
});

it('jeden mezičas', () => {
  const mezicasy = [
    { id: 0, duration: moment.duration(234), cisloClass: FakeCislo, onRemove: fakeOnRemove }
  ];
  const component = renderer.create(<Mezicasy mezicasy={mezicasy} cisloClass={FakeCislo} />);
  expect(component.toJSON()).toMatchSnapshot();
});

it('tři mezičasy', () => {
  const mezicasy = [
    { id: 0, duration: moment.duration(234), cisloClass: FakeCislo, onRemove: fakeOnRemove },
    { id: 1, duration: moment.duration(567), cisloClass: FakeCislo, onRemove: fakeOnRemove },
    { id: 2, duration: moment.duration(9024), cisloClass: FakeCislo, onRemove: fakeOnRemove }
  ];
  const component = renderer.create(<Mezicasy mezicasy={mezicasy} cisloClass={FakeCislo} />);
  expect(component.toJSON()).toMatchSnapshot();
});

it('jeden startující', () => {
  const mezicasy = [
    {
      id: 0,
      duration: moment.duration(234),
      cislo: 12,
      cisloClass: FakeCislo,
      onRemove: fakeOnRemove
    }
  ];
  const component = renderer.create(<Mezicasy mezicasy={mezicasy} cisloClass={FakeCislo} />);
  expect(component.toJSON()).toMatchSnapshot();
});
