import React from 'react';
import renderer from 'react-test-renderer';
import PopisekKategorie from './PopisekKategorie';

it('renders cyklo', () => {
  const component = renderer.create(<PopisekKategorie typ="cyklo" />);
  expect(component.toJSON()).toMatchSnapshot();
});

it('renders cyklo and text', () => {
  const component = renderer.create(<PopisekKategorie typ="cyklo" typAsText={true} />);
  expect(component.toJSON()).toMatchSnapshot();
});

it('renders koloběžka with pohlaví', () => {
  const component = renderer.create(<PopisekKategorie typ="koloběžka" pohlavi="žena" />);
  expect(component.toJSON()).toMatchSnapshot();
});

it('renders maraton with pohlaví and věk', () => {
  const vek = { min: 18, max: 39 };
  const component = renderer.create(<PopisekKategorie typ="maraton" pohlavi="muž" vek={vek} />);
  expect(component.toJSON()).toMatchSnapshot();
});

it('renders půlmaraton with pohlaví and věk (max)', () => {
  const vek = { min: 60, max: 150 };
  const component = renderer.create(<PopisekKategorie typ="půlmaraton" pohlavi="žena" vek={vek} />);
  expect(component.toJSON()).toMatchSnapshot();
});
