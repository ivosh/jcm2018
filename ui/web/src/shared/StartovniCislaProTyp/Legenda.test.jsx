import React from 'react';
import renderer from 'react-test-renderer';
import { dokoncene } from '../../Util';
import Legenda from './Legenda';

it('renders dokončeno', () => {
  const legenda = Object.values(dokoncene);

  const component = renderer.create(<Legenda legenda={legenda} />);
  expect(component.toJSON()).toMatchSnapshot();
});

it('renders dokončeno + neaktivní', () => {
  const legenda = Object.values(dokoncene);
  legenda.push({ name: 'neaktivni', popisek: 'neaktivní' });

  const component = renderer.create(<Legenda legenda={legenda} />);
  expect(component.toJSON()).toMatchSnapshot();
});
