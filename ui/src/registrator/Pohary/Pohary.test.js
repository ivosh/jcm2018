import React from 'react';
import renderer from 'react-test-renderer';
import Pohary from './Pohary';

it('dva nepřevzaté poháry', () => {
  const component = renderer.create(<Pohary count={2} poharStyle="nepřevzato" />);
  expect(component.toJSON()).toMatchSnapshot();
});
